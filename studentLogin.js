import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUfqyLzc9d9WOSwXVdqhJoUMSCcCTV9xM",
  authDomain: "hostel-management-system-70942.firebaseapp.com",
  projectId: "hostel-management-system-70942",
  storageBucket: "hostel-management-system-70942.appspot.com",
  messagingSenderId: "552250191673",
  appId: "1:552250191673:web:607cf0a580d375bab182e8"
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






