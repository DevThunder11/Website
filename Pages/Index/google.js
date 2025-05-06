import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Initialize Firebase
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

// Get the existing Firebase app instance
const auth = getAuth(getApp());
const db = getFirestore();
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('googleSignInButton');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    const email = user.email;
                    const name = user.displayName;
                    const userData = {
                        email: email,
                        firstName: name,
                        lastName: "",
                        tutorial: false
                    };
                    const docRef = doc(db, "users", user.uid);

                    // Check if the document already exists
                    getDoc(docRef).then((docSnap) => {
                        if (!docSnap.exists()) {
                            setDoc(docRef, userData)
                                .then(() => {
                                    console.log('Document created:', docRef);
                                    localStorage.setItem('loggedInUserId', user.uid);
                                    window.location.replace('../Home/Home.html');
                                })
                                .catch((error) => {
                                    console.error("Error writing document", error);
                                });
                        } else {
                            console.log('Document already exists:', docRef);
                            localStorage.setItem('loggedInUserId', user.uid);
                            window.location.replace('../Home/Home.html');
                        }
                    }).catch((error) => {
                        console.error("Error checking document existence", error);
                    });
                })
                .catch((error) => {
                    console.error('Error during Google sign-in:', error);
                    alert('Unable to sign in with Google');
                });
        });
    }
});