// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// import {getAuth,GoogleAuthProvider,signInWithPopup,updatePassword} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
// import { getApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyCNYmk4_98bZAF1dC6l2qLzNaN1jxQZSz8",
//     authDomain: "login-form-41214.firebaseapp.com",
//     projectId: "login-form-41214",
//     storageBucket: "login-form-41214.firebasestorage.app",
//     messagingSenderId: "41268181973",
//     appId: "1:41268181973:web:acc852fa5e9bacd8665b5c",
//     measurementId: "G-Y6D3M3TJGP"
// };

// // 1) สร้าง App แล้วเก็บตัวแปรไว้
// const app = initializeApp(firebaseConfig);

// // 2) เรียก analytics, auth, db โดยใช้ app ตัวเดียวกัน
// getAnalytics(app);
// const auth = getAuth(app);
// const db   = getFirestore(app);

// // 3) provider เดิม
// const provider = new GoogleAuthProvider();

// document.addEventListener('DOMContentLoaded', () => {
//     const googleBtn = document.getElementById('googleSignInButton');
    
//     if (googleBtn) {
//         googleBtn.addEventListener('click', () => {
//             signInWithPopup(auth, provider)
//                 .then((result) => {
//                     const user = result.user;
//                     const email = user.email;
//                     const name = user.displayName;
//                     const userData = {
//                         email: email,
//                         firstName: name,
//                         lastName: "",
//                         tutorial: false
//                     };
//                     const docRef = doc(db, "users", user.uid);

//                     // Check if the document already exists
//                     getDoc(docRef).then((docSnap) => {
//                         if (!docSnap.exists()) {
//                             setDoc(docRef, userData)
//                                 .then(() => {
//                                     console.log('Document created:', docRef);
//                                     localStorage.setItem('loggedInUserId', user.uid);
//                                     window.location.replace('../Home/Home.html');
//                                 })
//                                 .catch((error) => {
//                                     console.error("Error writing document", error);
//                                 });
//                         } else {
//                             console.log('Document already exists:', docRef);
//                             localStorage.setItem('loggedInUserId', user.uid);
//                             window.location.replace('../Home/Home.html');
//                         }
//                     }).catch((error) => {
//                         console.error("Error checking document existence", error);
//                     });
//                 })
//                 .catch((error) => {
//                     console.error('Error during Google sign-in:', error);
//                     alert('Unable to sign in with Google');
//                 });
//         });
//     }
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const googleBtn = document.getElementById('googleSignInButton');
//     if (!googleBtn) return;
  
//     googleBtn.addEventListener('click', async () => {
//       try {
//         // A) ล็อกอิน Google
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;
  
//         // B) เช็คว่า user นี้มี password provider หรือยัง
//         const hasPassword = user.providerData.some(p => p.providerId === 'password');
//         if (!hasPassword) {
//           // ขอรหัสผ่านใหม่ (ใช้ prompt ง่ายๆ)
//           const chosenPassword = prompt("ตั้งรหัสผ่านใหม่ (ขั้นต่ำ 6 ตัวอักษร):");
//           if (!chosenPassword || chosenPassword.length < 6) {
//             alert("ต้องป้อนรหัสผ่านอย่างน้อย 6 ตัวอักษร");
//             return;
//           }
//           // ผูกรหัสผ่านให้บัญชีนี้
//           await updatePassword(user, chosenPassword);
//           console.log("ผูก password เรียบร้อยแล้ว");
//         }
  
//         // C) เก็บข้อมูลลง Firestore (ถ้ายังไม่มี)
//         const email = user.email || "";
//         const name  = user.displayName || "";
//         const userData = { email, firstName: name, lastName: "", tutorial: false };
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
  
//         if (!docSnap.exists()) {
//           await setDoc(docRef, userData);
//           console.log('สร้างเอกสารใหม่:', docRef.id);
//         } else {
//           console.log('Document exists:', docRef.id);
//         }
  
//         // D) สุดท้าย redirect
//         localStorage.setItem('loggedInUserId', user.uid);
//         window.location.replace('../Home/Home.html');
  
//       } catch (error) {
//         console.error('Google sign-in error:', error);
//         if (error.code === 'auth/requires-recent-login') {
//           alert("กรุณาล็อกอิน Google ใหม่ก่อน");
//         } else {
//           alert(`Error: ${error.message}`);
//         }
//       }
//     });
//   });

// google.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics }  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  linkWithCredential,
  updatePassword
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

const app      = initializeApp(firebaseConfig);
getAnalytics(app);
const auth     = getAuth(app);
const db       = getFirestore(app);
const provider = new GoogleAuthProvider();

// 2) ฟังก์ชันรอ modal ขอรหัสเก่า
function requestExistingPassword() {
  return new Promise(resolve => {
    const modal = document.getElementById("pw-modal");
    const input = document.getElementById("pw-input");
    const btn   = document.getElementById("pw-confirm-btn");
    input.value = "";
    modal.style.display = "flex";
    btn.onclick = () => {
      const pw = input.value.trim();
      if (pw.length < 6) {
        alert("รหัสอย่างน้อย 6 ตัวอักษร");
        return;
      }
      modal.style.display = "none";
      resolve(pw);
    };
  });
}

// 3) Flow Google Sign‑In
document.addEventListener("DOMContentLoaded", () => {
  const googleBtn = document.getElementById("googleSignInButton");
  if (!googleBtn) return;

  googleBtn.addEventListener("click", async () => {
    try {
      // A) เปิด popup Google
      const result = await signInWithPopup(auth, provider);
      const { user, credential } = result;
      const email = user.email;

      // B) ตรวจดูว่ามี email/password account เก่าไหม
      const methods = await fetchSignInMethodsForEmail(auth, email);
      console.log(methods);
      if (methods.includes("password")) {
        // B1) มีให้ขอรหัสเก่า → ล็อกอิน → ผูก Google เข้าบัญชีเดิม
        const oldPw = await requestExistingPassword();
        const emailCred = await signInWithEmailAndPassword(auth, email, oldPw);
        await linkWithCredential(emailCred.user, credential);
        console.log("ผูก Google กับบัญชีอีเมลเดิมเรียบร้อย");
      }

      // C) สร้างหรืออัปเดตเอกสาร Firestore
      const userData = {
        email:      user.email       || "",
        firstName:  user.displayName || "",
        lastName:   "",
        tutorial:   false
      };
      const userDoc = doc(db, "users", user.uid);
      const snap    = await getDoc(userDoc);
      if (!snap.exists()) {
        await setDoc(userDoc, userData);
        console.log("สร้าง user document ใหม่");
      }

      // D) เก็บ UID แล้วไปหน้า Home
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.replace("../Home/Home.html");

    } catch (err) {
      console.error("Google Sign‑In Error:", err);
      alert(err.message);
    }
  });
});