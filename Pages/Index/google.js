import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// Get the existing Firebase app instance
const auth = getAuth(getApp());
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('googleSignInButton');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    localStorage.setItem('loggedInUserId', user.uid);
                    window.location.href = '../Home/home.html';
                })
                .catch((error) => {
                    console.error('เกิดข้อผิดพลาดในการล็อกอิน:', error);
                    alert('ไม่สามารถล็อกอินด้วย Google ได้');
                });
        });
    }
});
