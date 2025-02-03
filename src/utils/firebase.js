// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCpDAiAFMH0Qji9wRRjjSYxJnraxyZN9bo',
  authDomain: 'cinematch-97433.firebaseapp.com',
  projectId: 'cinematch-97433',
  storageBucket: 'cinematch-97433.firebasestorage.app',
  messagingSenderId: '25816086862',
  appId: '1:25816086862:web:f3ae1a51baec232b09461f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
