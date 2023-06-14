import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  // enter your own firbase config and API keys here
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app); // initialise Auth service and get a reference to the service

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, loginForm.email.value, loginForm.password.value)
        .then((userCredential) => {
        // Signed in
        // now redirect
        window.location = "student/studentHome.html"
        const user = userCredential.user;
        // ...
        })
        .catch((error) => {
            // logging the error code
            alert(error.message);
            console.log(error.message);
    });

} )






