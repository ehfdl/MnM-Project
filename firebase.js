import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyDv7dhgaN_pOOCBjYM2LSJsVPbr3Op6wWQ",
  authDomain: "mnm-project-44d50.firebaseapp.com",
  projectId: "mnm-project-44d50",
  storageBucket: "mnm-project-44d50.appspot.com",
  messagingSenderId: "175044477546",
  appId: "1:175044477546:web:92f3b20fc8ea21c5150013",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app); // fireStore 이용을 위한 변수!
