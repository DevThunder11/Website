// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import{getFirestore, getDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
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

onAuthStateChanged(auth, (user)=>{
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
      })
      .catch((error)=>{
          console.log("Error getting document");
      })
  }
  else{
      console.log("User Id not Found in Local storage")
  }
})

/////updated infomation/////

//db already been declaer
// Get the logged-in user's ID (assumes user ID is stored in localStorage after login)
// Update with your actual method to fetch user ID

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
