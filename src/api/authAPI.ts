import axios from "axios";
import appConfig from "../config/config";
import { firebaseClientAuth } from "../config/firebaseClientConfig";
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from "firebase/auth";

interface AuthModel {
      email: string;
      username: string;
      profilePic: string
}

interface AuthRequest {
      email: string;
      password: string;
      confirmPassword: string;
      username: string;
      profilePic?: File;
}

interface AuthResponse {
      ok: boolean;
      message?: string;
      data?: AuthModel
}

export interface AuthAPI {
      register: (data: AuthRequest) => Promise<AuthResponse>;
      login: (data: { email: string; password: string }) => Promise<AuthResponse>;
      logout: () => Promise<void>;
}

export const authAPI: AuthAPI = {
      async register(data: AuthRequest) {
            try {
                  if (data.password !== data.confirmPassword) {
                        throw new Error('Passwords do not match');
                  }
                  const firebaseCreateUserResponse = await createUserWithEmailAndPassword(
                        firebaseClientAuth,
                        data.email,
                        data.password
                  );

                  const newUser = new FormData();
                  newUser.append('username', data.username);
                  if (data.profilePic) {
                        newUser.append('profilePic', data.profilePic);
                  }
                  const createUserResponse = await axios.post(
                        `${appConfig.backendBaseUrl}:${appConfig.backendPort.auth}/auth/register`,
                        newUser,
                        {
                              headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'Authorization': `Bearer ${await firebaseCreateUserResponse.user.getIdToken()}`
                              },
                              withCredentials: true
                        }
                  )

                  if (!createUserResponse.data.ok || createUserResponse.status !== 201) {
                        const errorData = await createUserResponse.data.json()
                        throw new Error(errorData.message || 'Registration failed')
                  }
                  return createUserResponse.data;                  
            } catch (error) {
                  // const firebaseUser = firebaseClientAuth.currentUser;
                  // if (firebaseUser) {
                  //       await deleteUser(firebaseUser);
                  // }
                  throw error;
            }
      },

      async login(data: { email: string; password: string }) {
            try {
                  const firebaseLoginResponse = await signInWithEmailAndPassword(
                        firebaseClientAuth,
                        data.email,
                        data.password
                  );
                  const loginResponse = await axios.post(
                        `${appConfig.backendBaseUrl}:${appConfig.backendPort.auth}/auth/login`,
                        {},
                        {
                              headers: {
                                    'Authorization': `Bearer ${await firebaseLoginResponse.user.getIdToken()}`
                              },
                              withCredentials: true
                        }
                  );

                  if (!loginResponse.data.ok || loginResponse.status !== 200) {
                        const errorData = await loginResponse.data.json()
                        throw new Error(errorData.message || 'Login failed')
                  }
                  return loginResponse.data;
            } catch (error) {
                  const errorCode = (error as any)?.code || 'unknown_error';
                  if (errorCode === 'auth/user-not-found') {
                        throw new Error('ไม่พบอีเมลนี้ในระบบ (Account ผิด)');
                  } else if (errorCode === 'auth/wrong-password') {
                        throw new Error('รหัสผ่านไม่ถูกต้อง (Password ผิด)');
                  } else if (errorCode === 'auth/invalid-credential') {
                        throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
                  } else {
                        console.log('เกิดข้อผิดพลาดอื่น ๆ:', (error as any).message);
                  }
                  throw error;
            }
      },
      async logout() {
            try {
                  await signOut(firebaseClientAuth);
                  const logoutResponse = await axios.post(
                        `${appConfig.backendBaseUrl}:${appConfig.backendPort.auth}/auth/logout`,
                        {},
                        {
                              withCredentials: true
                        }
                  );
                  return logoutResponse.data;
            } catch (error) {
                  console.error('Error occurred while logging out:', (error as any).message);
                  throw error;
            }
      }
};
