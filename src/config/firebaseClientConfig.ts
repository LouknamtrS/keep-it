// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";
import appConfig from "./config";

// // Initialize Firebase
const firebaseClientConfig = initializeApp(appConfig.firebase);
export const firebaseClientAuth = getAuth(firebaseClientConfig);