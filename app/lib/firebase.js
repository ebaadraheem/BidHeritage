
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1AGrm4xU5x2rYrLLYnoWuN3KI12xivOk",
  authDomain: "old-heritage-ba4c1.firebaseapp.com",
  projectId: "old-heritage-ba4c1",
  storageBucket: "old-heritage-ba4c1.appspot.com",
  messagingSenderId: "190992726231",
  appId: "1:190992726231:web:dcdf105fb010b4eeee1892",
  measurementId: "G-GXPCRD4T0P"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()


export const googleProvider = new GoogleAuthProvider();


export { auth, app }