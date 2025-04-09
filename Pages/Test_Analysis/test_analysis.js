// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {explanation} from "/Pages/Test_analysis/explanation.js"

// Loader functionality
document.addEventListener('DOMContentLoaded', function() {
  // Hide loader and show content after 1.5 seconds
  setTimeout(function() {
    document.getElementById('loader').style.display = 'none';
    document.body.style.visibility = 'visible';
  }, 1500);
});

// Your web app's Firebase configuration
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
const db = getFirestore(app);

// Intersection Observer for question items
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const questionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            questionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the logged-in user's ID and selected test index
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const selectedTestIndex = localStorage.getItem('selectedTestIndex');

    if (loggedInUserId && selectedTestIndex !== null) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                const testData = userData.linear_1Data[selectedTestIndex];
                
                // Display test details
                const testDateElement = document.getElementById('test-date');
                const testScoreElement = document.getElementById('test-score');
                
                if (testDateElement) {
                    testDateElement.textContent = `Test Date: ${testData.Date}`;
                } else {
                    console.error('test-date element not found');
                }
                
                if (testScoreElement) {
                    testScoreElement.textContent = `Score: ${testData.score} / ${testData.Question.length}`;
                } else {
                    console.error('test-score element not found');
                }
                
                // Display questions and answers
                const questionsContainer = document.getElementById('questions-container');
                if (!questionsContainer) {
                    console.error('questions-container element not found');
                    return;
                }
                testData.Question.forEach((question, index) => {
                    const questionDiv = document.createElement('div');
                    questionDiv.className = 'question-item';
                    
                    const userAnswer = testData.Answer[index];
                    const correctAnswer = testData.Question[index].answers.find(answer => answer.correct === true).text;
                    const correctAnswerChoice = parseInt(correctAnswer.match(/^(\d+)\)/)?.[1]);
                    const isCorrect = userAnswer === correctAnswerChoice;
                    const template = testData.Question[index].template;
                    const question_text = testData.Question[index].question;

                    // Get explanation text
                    const explanation_text = explanation(template , question_text);

                    // Display question, user answer, correct answer, and explanation
                    questionDiv.innerHTML = `
                        <h3>Question ${index + 1}</h3>
                        <p>${question.question}</p>
                        <p>Your Answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${userAnswer} ( ${isCorrect ? 'correct' : 'incorrect'} )</span></p>
                        <p>Correct Answer: <span class="correct_answer">${correctAnswer}</span></p>
                        <div class="explanation"><p>${explanation_text}</p></div>
                    `;
                    
                    // Add click event listener to toggle explanation
                    questionDiv.addEventListener('click', function() {
                        const explanation = this.querySelector('.explanation');
                        explanation.classList.toggle('active');
                    });
                    
                    
                    questionsContainer.appendChild(questionDiv);
                    // Observe the question div for animation
                    questionObserver.observe(questionDiv);
                });
            } else {
                console.error("Document does not exist in Firestore!");
            }
        })
        .catch((error) => {
            console.error("Error fetching document:", error);
        });
} else {
    console.error("User ID or selected test index not found in localStorage.");
    }
});