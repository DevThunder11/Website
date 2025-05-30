// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore();

// Get test results from localStorage
const score = localStorage.getItem('testScore');
const totalQuestions = localStorage.getItem('totalQuestions');
const summaryHtml = localStorage.getItem('testSummary');
const questions = JSON.parse(localStorage.getItem('questions'));
const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));

// Update the score display
document.getElementById('score').textContent = score;
document.querySelector('.total').textContent = `/${totalQuestions}`;

// Generate and update the summary content
const summaryContainer = document.getElementById('summary');

// Use the pre-generated summary HTML if available
if (summaryHtml) {
    summaryContainer.innerHTML = summaryHtml;
}

// Clear the test data from localStorage
localStorage.removeItem('testScore');
localStorage.removeItem('testSummary');
localStorage.removeItem('totalQuestions');
localStorage.removeItem('questions');
localStorage.removeItem('userAnswers');

document.getElementById('confirm').addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        // Reference to the user's Firestore document
        const userId = localStorage.getItem("loggedInUserId");
        const userDocRef = doc(db, "users", userId);
        const docSnap = await getDoc(userDocRef);
        const userData = docSnap.data();

        // Update Firestore document

        let questionData = userData.Energy_1Data || [];
        const currentData = userData.Energy_1Current_Data || {};


        if (questionData == undefined) {
            questionData = [];
        }

        // Ensure the length of linear_1Data is at most 9
        while (questionData.length >= 10) {
            questionData.shift(); // Remove the first element
        }

        // Add the new data if it exists
        if (userData.Energy_1Current_Data) {
            questionData.push(userData.Energy_1Current_Data);
        }

        await updateDoc(userDocRef, {
            Energy_1Data: questionData,
        });

        // Redirect to test page
        window.location.replace("/Pages/Home/Home.html");
    } catch (error) {
        console.error("Error updating user info: ", error);
        alert("Failed to update number of questions. Please try again.");
    }
});

document.getElementById('cancle').addEventListener("click", () => {
    window.location.replace("/Pages/Home/Home.html");
});
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