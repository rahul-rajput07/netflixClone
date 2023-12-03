import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKK2YNH4auOvGBtwrAlFdl3tpI-eECqbM",
  authDomain: "netflix-clone-react-48fa5.firebaseapp.com",
  projectId: "netflix-clone-react-48fa5",
  storageBucket: "netflix-clone-react-48fa5.appspot.com",
  messagingSenderId: "636096783974",
  appId: "1:636096783974:web:939234ce9c92c7918f6fa7",
  measurementId: "G-DB24MPSSQX",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
