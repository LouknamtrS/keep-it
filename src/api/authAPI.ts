import axios from "axios";
import appConfig from "../config/config";
import { firebaseClientAuth } from "../config/firebaseClientConfig";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";

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
                              }
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
      }
};
