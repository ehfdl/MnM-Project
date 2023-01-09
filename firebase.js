import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAI4xVkbpvs1WC1U6B14h6Yqr_6BueD-Ds',
  authDomain: 'nativeapp-c88e4.firebaseapp.com',
  projectId: 'nativeapp-c88e4',
  storageBucket: 'nativeapp-c88e4.appspot.com',
  messagingSenderId: '737947757008',
  appId: '1:737947757008:web:171a110c8e750a9bbd71d5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
