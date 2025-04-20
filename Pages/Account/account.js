// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import{getFirestore, getDoc, doc, updateDoc,collection,addDoc,setDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
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


// Initialize Firebase
const auth=getAuth();
const db=getFirestore();

// Function to show/hide loader and content
function toggleLoader(show) {
    const loaders = document.querySelectorAll('.loader');
    const rightBoxes = document.querySelectorAll('.right_box');
    
    rightBoxes.forEach(box => {
        const children = Array.from(box.children);
        children.forEach(child => {
            if (!child.classList.contains('loader')) {
                child.style.display = show ? 'none' : '';
            }
        });
    });
    
    loaders.forEach(loader => {
        loader.style.display = show ? 'block' : 'none';
    });
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', function() {
    signOut(auth).then(() => {
        console.log('User signed out successfully');
        window.location.href = '../../index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
});

// Add menu selection functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hide all loaders initially
    toggleLoader(false);

    // Get all menu items
    const menuItems = document.querySelectorAll('.left_bar li');
    // Get all right boxes
    const rightBoxes = document.querySelectorAll('.right_box');

    // Add click event listener to each menu item
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Show loader and hide content
            toggleLoader(true);

            // Remove selected class from all items
            menuItems.forEach(i => i.classList.remove('selected'));
            // Add selected class to clicked item
            this.classList.add('selected');

            // Hide all right boxes
            rightBoxes.forEach(box => box.style.display = 'none');
            // Show the corresponding right box
            const boxId = this.querySelector('a').textContent.toLowerCase();
            document.getElementById(boxId).style.display = 'block';

            // Hide loader and show content after 1.5 seconds
            setTimeout(() => toggleLoader(false), 500);
        });
    });

    // Set Profile as default selected and show profile box
    document.querySelector('.profile').classList.add('selected');
    document.getElementById('profile').style.display = 'block';
});

//Show user information in profile window
onAuthStateChanged(auth, (user)=>{
    // Show loader while fetching user data
    toggleLoader(true);

    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
      console.log(user);
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
      .then((docSnap)=>{
          if(docSnap.exists()){
              const userData=docSnap.data();
              if (userData.firstName) document.getElementById('loggedUserFName').innerText=userData.firstName;
              if (userData.email) document.getElementById('loggedUserEmail').innerText=userData.email;
              if (userData.lastName) document.getElementById('loggedUserLName').innerText=userData.lastName;
              
              // Check if telephone exists
              const telForm = document.getElementById('Tel');
              const telNumElement = document.getElementById('tellephonenum');
              
              if (userData.tel && telNumElement) {
                  telNumElement.innerText = userData.tel;
                  telNumElement.style.display = 'block';
                  if (telForm) telForm.style.display = 'none';
                  submitButton.style.display = 'none'
              } else {
                  if (telNumElement) telNumElement.style.display = 'none';
                  if (telForm) telForm.style.display = 'block';
              }
          } else {
              console.log("no document found matching id")
          }
          // Hide loader after data is loaded
          toggleLoader(false);
      })
      .catch((error)=>{
          console.log("Error getting document");
          // Hide loader on error
          toggleLoader(false);
      })
  }
  else{
      console.log("User Id not Found in Local storage")
      // Hide loader if no user ID
      toggleLoader(false);
  }
})

// Event listener for submit button
const submitButton = document.getElementById('submit');
if (submitButton) {
    submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // Get input values
    const telephone = document.getElementById('Tel').value;
    
    try {
        // Reference to the user's Firestore document
        const userId = localStorage.getItem('loggedInUserId');
        const userDocRef = doc(db, "users", userId);

        
        // Update the Firestore document with new fields
        await updateDoc(userDocRef, {
            tel: telephone
        });

        // Display success message
        const telNumElement = document.getElementById('tellephonenum');
        const telInput = document.getElementById('Tel');
        
        if (telNumElement && telInput) {
            telNumElement.textContent = telephone;
            telNumElement.style.display = 'inline-block';
            telInput.style.display = 'none';
            submitButton.style.display = 'none';
        }

        alert("Telephone Number updated successfully!");
    } catch (error) {
        console.error("Error updating user info: ", error);
        alert("Failed to update user information. Please try again.");
    }
});
}

//Feedback
async function addFeedbackToUser(userId, feedbackData) {
    try {
      const userDocRef = doc(db, "users", userId);
      const feedbackCollectionRef = collection(userDocRef, "--Feedback--");
      const docRef = await addDoc(feedbackCollectionRef, feedbackData);
      console.log("Feedback document added with ID: ", docRef.id);
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error adding feedback document: ", error);
      alert("Failed to submit feedback. Please try again.");
    }
  }

  // Listen for DOM to load
  window.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    feedbackForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get the feedback text
      const feedbackText = document.getElementById("feedbackInput").value.trim();
      if (!feedbackText) {
        alert("Please enter a feedback comment before submitting.");
        return;
      }

      // Example user ID; replace with your actual user doc ID
      const userId = "someUserDocId";
      const feedbackData = {
        comment: feedbackText,
        timestamp: new Date(),
      };

      // Send to Firestore
      await addFeedbackToUser(userId, feedbackData);

      // Reset form
      feedbackForm.reset();
    });
  });