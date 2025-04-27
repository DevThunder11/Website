// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import{getFirestore, setDoc, doc, getDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
import { updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides(n) {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'inactive');
        if (index === n) {
            slide.classList.add('active');
        } else {
            slide.classList.add('inactive');
        }
    });
    const endButton = document.getElementById('endButton');
    if (n === slides.length - 1) {
        endButton.style.display = 'block';
    } else {
        endButton.style.display = 'none';
    }
}

function plusSlides(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) {
        slideIndex = slides.length - 1; // Prevent looping forward
    } else if (slideIndex < 0) {
        slideIndex = 0; // Prevent looping backward
    }
    showSlides(slideIndex);
}

// Initialize the first slide
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
});

const endButton = document.getElementById('endButton');
endButton.addEventListener('click', function() {
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
      .then((docSnap)=>{
          if(docSnap.exists()){
              updateDoc(docRef, { tutorial: true })
              .then(() => {
                  console.log("Tutorial status updated successfully");
                  window.location.href = '../Home/Home.html';
              })
              .catch((error) => {
                  console.error("Error updating document", error);
              });
          } else {
              console.log("no document found matching id")
          }
          // Hide loader after data is loaded
      })
      .catch((error)=>{
          console.log("Error getting document", error);
          // Hide loader on error
      })
    }
  else{
      console.log("User Id not Found in Local storage")
  }
});
document.querySelector('.prev').addEventListener('click', function() { plusSlides(-1); });
document.querySelector('.next').addEventListener('click', function() { plusSlides(1); });