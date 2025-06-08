// google.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics }  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNYmk4_98bZAF1dC6l2qLzNaN1jxQZSz8",
  authDomain: "login-form-41214.firebaseapp.com",
  projectId: "login-form-41214",
  storageBucket: "login-form-41214.firebasestorage.app",
  messagingSenderId: "41268181973",
  appId: "1:41268181973:web:acc852fa5e9bacd8665b5c",
  measurementId: "G-Y6D3M3TJGP"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth     = getAuth(app);
const db       = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

// function splitDisplayName(displayName) {
//   if (!displayName) {
//     return { firstName: "", lastName: "" };
//   }
//   const parts = displayName.trim().split(" ");
//   if (parts.length === 1) {
//     return { firstName: parts[0], lastName: "" };
//   }
//   const first = parts[0];
//   const last = parts.slice(1).join(" ");
//   return { firstName: first, lastName: last };
// }

document.getElementById('googleSignInButton').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);

      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (!docSnap.exists()) {
            setDoc(userDocRef, {
              firstName: user.displayName,
              lastName: "",
              email: user.email,
              tutorial: false
            })
             .then(() => {
              console.log('User document created');
              localStorage.setItem('loggedInUserId', user.uid);
              window.location.replace("/Pages/Home/Home.html")
             })
          }
          else {
            console.log('User document exists');
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.replace("/Pages/Home/Home.html")
          }
      })
    })
    .catch((error) => {
      console.error(error);
    });
});

