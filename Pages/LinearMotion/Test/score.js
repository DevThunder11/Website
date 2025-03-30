// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

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