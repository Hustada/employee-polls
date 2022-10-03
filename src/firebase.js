// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn1H9-WzQhWTlnbgK-dXBl0hSQm1eW-VY",
  authDomain: "employee-poll.firebaseapp.com",
  projectId: "employee-poll",
  storageBucket: "employee-poll.appspot.com",
  messagingSenderId: "434085422274",
  appId: "1:434085422274:web:064caadc5a518d82c9075b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;