// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
 import{getFirestore, setDoc, doc, getDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

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
// เพิ่มฟังก์ชันสำหรับตรวจสอบและอัพเดท Dark Mode
function updateDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', isDarkMode);
  console.log('Updated Dark Mode:', isDarkMode);
}

document.addEventListener('DOMContentLoaded', () => {
  // ตรวจสอบสถานะเริ่มต้น
  updateDarkMode();

  // ตรวจจับการเปลี่ยนแปลง
  window.addEventListener('storage', (e) => {
      if (e.key === 'darkMode') {
          updateDarkMode();
      }
  });
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();

/////////////////////////////////////////////
//Show user information in profile window
document.addEventListener('DOMContentLoaded', () => {
  console.log("Page loaded")
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                const tutorial = userData.tutorial;
                if (tutorial === false || tutorial === undefined) {
                  console.log("You haven't done tutorial?")
                    window.location.href = '../Tutorial/tutorial.html';
                }
            } else {
                console.log("no document found matching id");
            }
        })
        .catch((error) => {
            console.log("Error getting document");
        });
    } else {
        console.log("User Id not Found in Local storage");
    }
});

// // Remove the onAuthStateChanged function as it's no longer needed
// onAuthStateChanged(auth, (user)=>{
//     // Show loader while fetching user data
//     const loggedInUserId=localStorage.getItem('loggedInUserId');
//     if(loggedInUserId){
//       const docRef = doc(db, "users", loggedInUserId);
//       getDoc(docRef)
//       .then((docSnap)=>{
//           if(docSnap.exists()){
//               const userData=docSnap.data();
//               const tutorial = userData.tutorial;
//               if (tutorial === false || tutorial === undefined) {
//                 window.location.href = '../Tutorial/tutorial.html';
//             }
//           } else {
//               console.log("no document found matching id")
//           }
//           // Hide loader after data is loaded
//       })
//       .catch((error)=>{
//           console.log("Error getting document");
//           // Hide loader on error
//       })
//     }
//   else{
//       console.log("User Id not Found in Local storage")
//       // Hide loader if no user ID
//   }
// })
