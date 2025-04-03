// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {getAuth, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNYmk4_98bZAF1dC6l2qLzNaN1jxQZSz8",
  authDomain: "login-form-41214.firebaseapp.com",
  projectId: "login-form-41214",
  storageBucket: "login-form-41214.firebasestorage.app",
  messagingSenderId: "41268181973",
  appId: "1:41268181973:web:acc852fa5e9bacd8665b5c",
  measurementId: "G-Y6D3M3TJGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();

const reset = document.getElementById("reset");
reset.addEventListener("click", function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    sendPasswordResetEmail(auth, email)
    .then(() => {
        // Password reset email sent!
        // ..
        alert("Password reset email sent!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
    });
})
