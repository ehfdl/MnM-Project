import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDv7dhgaN_pOOCBjYM2LSJsVPbr3Op6wWQ",
  authDomain: "mnm-project-44d50.firebaseapp.com",
  projectId: "mnm-project-44d50",
  storageBucket: "mnm-project-44d50.appspot.com",
  messagingSenderId: "175044477546",
  appId: "1:175044477546:web:92f3b20fc8ea21c5150013",
};

const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
// export const storageService = getStorage(app);
