const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');
const googleSignInButton=document.getElementById('googleSignInButton');
const googleSignInButton2=document.getElementById('googleSignInButton2');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})
googleSignInButton.addEventListener('click', function(){
    window.location.href="google.html";
})
googleSignInButton2.addEventListener('click', function(){
    window.location.href="google.html";
})
