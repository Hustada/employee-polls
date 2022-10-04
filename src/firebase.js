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

const auth = getAuth(app);

const getCurrentUser = () => {
  return auth.currentUser
}

console.log('Firebase Auth:', getCurrentUser());

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const signUp = () => {
  useEffect()

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Success!");
  })
  .catch((error) => {
    const errorCode = error.code;
    // const errorMessage = error.message;
    alert(errorCode);
  });
}

const signIn = () => {

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Sign in Success!");
  })
  .catch((error) => {
    const errorCode = error.code;
    // const errorMessage = error.message;
    alert(errorCode);
  });
}

const signUserOut = () => {
  signOut(auth).then(() => {
    alert('Sign out Success!')
    // Sign-out successful.
  }).catch((error) => {
    const errorCode = error.code;
    alert(errorCode);
    // An error happened.
  });

export default app;