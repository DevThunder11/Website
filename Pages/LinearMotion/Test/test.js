// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// Loader functionality
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.getElementById('loader').style.display = 'none';
    document.body.style.visibility = 'visible';
  }, 1500);
});

import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import{getFirestore, getDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

//timer

// Get or initialize timer state from localStorage
let targetTime = localStorage.getItem("targetTime");
const inputMinutes = parseInt(localStorage.getItem("countdownMinutes"));

// If no target time exists or if inputMinutes has changed, set a new target time
if (!targetTime || localStorage.getItem("lastInputMinutes") !== localStorage.getItem("countdownMinutes")) {
    targetTime = new Date().getTime() + inputMinutes * 60 * 1000;
    localStorage.setItem("targetTime", targetTime);
    localStorage.setItem("lastInputMinutes", inputMinutes.toString());
} else {
    targetTime = parseInt(targetTime);
}

// Start the countdown
const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetTime - now;

    if (timeLeft > 0) {
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        if(hours < 10){
            hours = [0,hours].join("")
        }
        if(minutes < 10){
            minutes = [0,minutes].join("")
        }
        if(seconds < 10){
            seconds = [0,seconds].join("")
        }
        document.getElementById("countdown").innerHTML =
            `${hours}:${minutes}:${seconds}`;
    } else {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "Time's up!";
        // Clear timer state when time's up
        localStorage.removeItem("targetTime");
        localStorage.removeItem("lastInputMinutes");
        // Trigger end button click when timer runs out
        document.getElementById('Endbutton').click();
    }
}, 1000);

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

let questions =[]

// Initialize Firebase
const auth=getAuth();
const db=getFirestore();

const ChoiceList = document.querySelectorAll(".choice");
const SectionList = document.querySelectorAll(".num");

let limit = parseInt(localStorage.getItem('NumQ'));

let section = 0; // Current question index
let score = 0; // User's score

// Check if we need to initialize a fresh array or use the stored one
let your_answer;

// Check if we're coming from test_setting page
if (localStorage.getItem('from_test_setting') === 'true') {
    // Create a fresh array if coming from test_setting
    your_answer = Array(limit).fill(0);
    // Save the fresh array to localStorage
    localStorage.setItem('your_answer', JSON.stringify(your_answer));
    // Reset the flag
    localStorage.setItem('from_test_setting', 'false');
} else {
    // Try to get the stored array from localStorage
    const storedAnswers = localStorage.getItem('your_answer');
    if (storedAnswers) {
        your_answer = JSON.parse(storedAnswers);
        // Make sure the array is the correct length
        if (your_answer.length !== limit) {
            your_answer = Array(limit).fill(0);
            localStorage.setItem('your_answer', JSON.stringify(your_answer));
        }
    } else {
        // If no stored array, initialize a new one
        your_answer = Array(limit).fill(0);
        localStorage.setItem('your_answer', JSON.stringify(your_answer));
    }
}

// Function to update the question and answers based on the current section
function updateQuestionAndAnswers(userData) {
    const questionData = userData.linear_1Current_Data.Question[section];

    // Update the question and answer elements
    document.getElementById('Question').innerText = `${section + 1}) ${questionData.question}`;
    document.getElementById('Ans1').innerText = questionData.answers[0].text;
    document.getElementById('Ans2').innerText = questionData.answers[1].text;
    document.getElementById('Ans3').innerText = questionData.answers[2].text;
    document.getElementById('Ans4').innerText = questionData.answers[3].text;
    makeItDarker()
    TopQuestion()

    console.log("section:",section)
}



// Firebase Authentication listener
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);

        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // Load the first question
                    updateQuestionAndAnswers(userData);
                } else {
                    console.error("No document found matching the user ID.");
                }
            })
            .catch((error) => {
                console.error("Error fetching document:", error);
            });
    } else {
        console.error("User ID not found in localStorage.");
    }
});

///AnswerClick///

function makeItDarker(){
    ChoiceList.forEach((button, index) => {
        if (!isNaN(your_answer[section]) && your_answer[section] === index + 1){
            button.style.backgroundColor = "#25739b";
        } else{
            button.style.backgroundColor = ""
        }
    })
}

ChoiceList.forEach((button, index) => {
    button.addEventListener('click',()=>{
        your_answer[section] = index+1;
        console.log(your_answer)
        // Save to localStorage to persist across page reloads
        localStorage.setItem('your_answer', JSON.stringify(your_answer));
        makeItDarker()
    })
})

///Top Button///

document.getElementById('nextQbutton').addEventListener('click',()=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        let limit = userData.linear_1Current_Data.Question.length
                        if (section >= limit){
                            section = limit;
                        } 
                        else{
                            section++;
                            updateQuestionAndAnswers(userData);
                        }
                    }
                })  
                .catch((error) => {
                    console.error("Error fetching document:", error);
                });
        }  
        else {
            console.error("User ID not found in localStorage.");
        }
});

document.getElementById('backQbutton').addEventListener('click',()=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        if (section <= 0){
                            section = 0;
                        } 
                        else{
                            section--;
                            updateQuestionAndAnswers(userData);
                        }
                    }
                })  
                .catch((error) => {
                    console.error("Error fetching document:", error);
                });
        }  
        else {
            console.error("User ID not found in localStorage.");
        }
});

function handleButton(buttonNumber) {

    if (buttonNumber === 1) {
        if (section == 1) {
            section = section - 1;
        } else if (section >= 2 && section < limit - 2) {
            section = section - 2;
        } else if (section == limit - 2) {
            section = section - 3;
        } else if (section == limit - 1) {
            section = section - 4;
        }
    } else if (buttonNumber === 2) {
        if (section == 0) {
            section = section + 1;
        } else if (section >= 2 && section < limit - 2) {
            section = section - 1;
        } else if (section == limit - 2) {
            section = section - 2;
        } else if (section == limit - 1) {
            section = section - 3;
        }
    } else if (buttonNumber === 3) {
        if (section == 0) {
            section = section + 2;
        } else if (section == 1) {
            section = section + 1;
        } else if (section == limit - 2) {
            section = section - 1;
        } else if (section == limit - 1) {
            section = section - 2;
        }
    } else if (buttonNumber === 4) {
        if (section == 0) {
            section = section + 3;
        } else if (section == 1) {
            section = section + 2;
        } else if (section >= 2 && section < limit - 2) {
            section = section + 1;
        } else if (section == limit - 1) {
            section = section - 1;
        }
    } else if (buttonNumber === 5) {
        if (section == 0) {
            section = section + 4;
        } else if (section == 1) {
            section = section + 3;
        } else if (section >= 2 && section < limit - 2) {
            section = section + 2;
        } else if (section == limit - 2) {
            section = section + 1;
        }
    }
}

// Set up event listeners for the buttons
['button1', 'button2', 'button3', 'button4', 'button5'].forEach((buttonId, index) => {
    document.getElementById(buttonId).addEventListener('click', () => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');

        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();

                        // Call handleButton with the button number (1 through 5)
                        handleButton(index + 1); // index + 1 because buttonId corresponds to button numbers 1 to 5
                        updateQuestionAndAnswers(userData);
                    } else {
                        console.error("No document found matching the user ID.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching document:", error);
                });
        } else {
            console.error("User ID not found in localStorage.");
        }
    });
});

function TopQuestion(){
    let limit = localStorage.getItem('NumQ')
    const Button1 =document.getElementById('button1');
    const Button2 =document.getElementById('button2');
    const Button3 =document.getElementById('button3');
    const Button4 =document.getElementById('button4');
    const Button5 =document.getElementById('button5');
    const endbutton = document.getElementById('Endbutton');
    const Top = document.getElementById('Toppart')
    if (section==0){
        document.getElementById('button1').innerText = `${section + 1}`;
        document.getElementById('button2').innerText = `${section + 2}`;
        document.getElementById('button3').innerText = `${section + 3}`;
        document.getElementById('button4').innerText = `${section + 4}`;
        document.getElementById('button5').innerText = `${section + 5}`;
        Button1.style.backgroundColor='#77bde0'
        Button1.style.color='#ffffff'
        Button2.style.backgroundColor='#f4f4f4'
        Button2.style.color='#000000'
        Button3.style.backgroundColor='#f4f4f4'
        Button3.style.color='#000000'
        Button4.style.backgroundColor='#f4f4f4'
        Button4.style.color='#000000'
        Button5.style.backgroundColor='#f4f4f4'
        Button5.style.color='#000000'
        endbutton.style.display="none";
    }
    if (section==1){
        document.getElementById('button1').innerText = `${section}`;
        document.getElementById('button2').innerText = `${section + 1}`;
        document.getElementById('button3').innerText = `${section + 2}`;
        document.getElementById('button4').innerText = `${section + 3}`;
        document.getElementById('button5').innerText = `${section + 4}`;
        Button1.style.backgroundColor='#f4f4f4'
        Button1.style.color='#000000'
        Button2.style.backgroundColor='#77bde0'
        Button2.style.color='#ffffff'
        Button3.style.backgroundColor='#f4f4f4'
        Button3.style.color='#000000'
        Button4.style.backgroundColor='#f4f4f4'
        Button4.style.color='#000000'
        Button5.style.backgroundColor='#f4f4f4'
        Button5.style.color='#000000'
        endbutton.style.display="none";
    }
    if (section >= 2 && section < limit - 2){
        document.getElementById('button1').innerText = `${section - 1}`;
        document.getElementById('button2').innerText = `${section}`;
        document.getElementById('button3').innerText = `${section + 1}`;
        document.getElementById('button4').innerText = `${section + 2}`;
        document.getElementById('button5').innerText = `${section + 3}`;
        Button1.style.backgroundColor='#f4f4f4'
        Button1.style.color='#000000'
        Button2.style.backgroundColor='#f4f4f4'
        Button2.style.color='#000000'
        Button3.style.backgroundColor='#77bde0'
        Button3.style.color='#ffffff'
        Button4.style.backgroundColor='#f4f4f4'
        Button4.style.color='#000000'
        Button5.style.backgroundColor='#f4f4f4'
        Button5.style.color='#000000'
        endbutton.style.display="none";
    }
    if (section == limit - 2){
        document.getElementById('button1').innerText = `${section - 2}`;
        document.getElementById('button2').innerText = `${section - 1}`;
        document.getElementById('button3').innerText = `${section}`;
        document.getElementById('button4').innerText = `${section + 1}`;
        document.getElementById('button5').innerText = `${section + 2}`;
        Button1.style.backgroundColor='#f4f4f4'
        Button1.style.color='#000000'
        Button2.style.backgroundColor='#f4f4f4'
        Button2.style.color='#000000'
        Button3.style.backgroundColor='#f4f4f4'
        Button3.style.color='#000000'
        Button4.style.backgroundColor='#77bde0'
        Button4.style.color='#ffffff'
        Button5.style.backgroundColor='#f4f4f4'
        Button5.style.color='#000000'
        endbutton.style.display="none";
    }
    if (section == limit - 1){
        document.getElementById('button1').innerText = `${section - 3}`;
        document.getElementById('button2').innerText = `${section - 2}`;
        document.getElementById('button3').innerText = `${section - 1}`;
        document.getElementById('button4').innerText = `${section}`;
        document.getElementById('button5').innerText = `${section + 1}`;
        Button1.style.backgroundColor='#f4f4f4'
        Button1.style.color='#000000'
        Button2.style.backgroundColor='#f4f4f4'
        Button2.style.color='#000000'
        Button3.style.backgroundColor='#f4f4f4'
        Button3.style.color='#000000'
        Button4.style.backgroundColor='#f4f4f4'
        Button4.style.color='#000000'
        Button5.style.backgroundColor='#77bde0'
        Button5.style.color='#ffffff'
        endbutton.style.display="block";
        Top.style.marginLeft="27%"
    }

}

///Check///

document.getElementById('Endbutton').addEventListener('click',()=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);

        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    let limit = userData.linear_1Current_Data.Question.length;
                    let score = 0;
                    let summaryHtml = '';
                    
                    for(let i = 0; i < limit; i++){
                        const question = userData.linear_1Current_Data.Question[i];
                        const userAnswer = your_answer[i];
                        const isCorrect = userAnswer > 0 && question.answers[userAnswer-1].correct;
                        if(isCorrect) score++;
                        
                        const correctAnswer = question.answers.find(ans => ans.correct);
                        summaryHtml += `
                            <div class="question-review ${isCorrect ? 'correct' : 'incorrect'}">
                                <h3>Question ${i + 1}</h3>
                                <p>${question.question}</p>
                                <p>Your answer: ${userAnswer ? question.answers[userAnswer-1].text : 'Not answered'}</p>
                                <p>Correct answer: ${correctAnswer.text}</p>
                            </div>
                        `;
                    }
                    
                    const questionData = userData.linear_1Current_Data;
                    questionData.Answer = your_answer;
                    questionData.score = score;

                    // Store the summary and score in localStorage for the score page
                    localStorage.setItem('testSummary', summaryHtml);
                    localStorage.setItem('testScore', score);
                    localStorage.setItem('totalQuestions', limit);

                    updateDoc(docRef, {
                        linear_1Current_Data: questionData
                    }).then(() => {
                        // Redirect to score page
                        window.location.href = 'score.html';
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching document:", error);
            });
    } else {
        console.error("User ID not found in localStorage.");
    }
});

//////
let alreadyclick = false;
const sectioninput = document.getElementById('select_section');
const sectionpoint = document.getElementById('button_selection');
const Top = document.getElementById('Toppart')
sectionpoint.addEventListener('click',()=>{
    if (alreadyclick == false){
        sectioninput.classList.add('show');
        sectionpoint.style.backgroundColor='#77bde0';
        sectionpoint.style.color='#f4f4f4';
        alreadyclick = true;
    } else {
        sectioninput.classList.remove('show');
        sectionpoint.style.backgroundColor='#f4f4f4';
        sectionpoint.style.color='#000000';
        alreadyclick = false;
    }
});

const inputField = document.getElementById('section_select'); // Get the input field

inputField.addEventListener('keydown', (event) => {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === 'Enter') {
        event.preventDefault(); // Optional: prevent the default behavior (if needed)

        const loggedInUserId = localStorage.getItem('loggedInUserId');
        console.log("Enter pressed");

        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        let limit = userData.linear_1Current_Data.Question.length;
                        const partselection = inputField.value; // Get value from the input field

                        // Convert input to a number
                        const partselectionNumber = Number(partselection);

                        // Check if the input is a valid number
                        if (isNaN(partselectionNumber) || partselectionNumber <= 0) {
                            alert("Number must be greater than 0");
                        } else if (partselectionNumber >= 1 && partselectionNumber <= limit) {
                            section = partselectionNumber - 1;
                            updateQuestionAndAnswers(userData);
                        } else if (partselectionNumber > limit) {
                            alert("Number must be lesser than Question Number");
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching document:", error);
                });
        } else {
            console.error("User ID not found in localStorage.");
        }
    }
});

//saveQuestion//

document.getElementById('confirm').addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        // Reference to the user's Firestore document
        const userId = localStorage.getItem("loggedInUserId");
        const userDocRef = doc(db, "users", userId);
        const docSnap = await getDoc(userDocRef);
        const userData = docSnap.data();

        // Update Firestore document

        let questionData = userData.linear_1Data;


        if (questionData == undefined) {
            questionData = [];
        }

        // Ensure the length of linear_1Data is at most 9
        while (questionData.length >= 10) {
            questionData.shift(); // Remove the first element
        }

        // Add the new data
        questionData.push(userData.linear_1Current_Data);

        await updateDoc(userDocRef, {
            linear_1Data: questionData,
        });

        // Clear the stored array when navigating away
        localStorage.removeItem('your_answer');

        // Redirect to test page
        window.location.href = "../../Home/Home.html";
    } catch (error) {
        console.error("Error updating user info: ", error);
        alert("Failed to update number of questions. Please try again.");
    }
});

document.getElementById('cancle').addEventListener("click", () => {
    // No need to clear localStorage for your_answer as we're not using it anymore
    window.location.href = "Home.html";
});