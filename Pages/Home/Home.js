// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
//  import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCNYmk4_98bZAF1dC6l2qLzNaN1jxQZSz8",
//   authDomain: "login-form-41214.firebaseapp.com",
//   projectId: "login-form-41214",
//   storageBucket: "login-form-41214.firebasestorage.app",
//   messagingSenderId: "41268181973",
//   appId: "1:41268181973:web:acc852fa5e9bacd8665b5c",
//   measurementId: "G-Y6D3M3TJGP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth();
// const db = getFirestore();

// // Check the tutorial boolean value from Firestore
// document.addEventListener('DOMContentLoaded', async () => {
//     const loggedInUserId = localStorage.getItem('loggedInUserId');
//     if (loggedInUserId) {
//         const docRef = doc(db, "users", loggedInUserId);
//         try {
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()) {
//                 const userData = docSnap.data();
//                 const tutorial = userData.tutorial;
//                 if (!tutorial) {
//                     window.location.href = 'tutorial.html';
//                 }
//             } else {
//                 console.log("No document found matching id");
//                 window.location.href = 'tutorial.html';
//             }
//         } catch (error) {
//             console.log("Error getting document", error);
//         }
//     } else {
//         console.log("User Id not Found in Local storage");
//     }
// });

