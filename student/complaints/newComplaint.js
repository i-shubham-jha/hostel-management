import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, deleteDoc, onSnapshot, query, where, setDoc, Timestamp} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
  // enter your own firbase config and API keys here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let email; // email address to be used for finding the ID


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    email = user.email;
    console.log('reached');
    // ...
  } else {
    // User is signed out
    // alert then redirect
    alert("Please Log In, redirecting to home page....");
    window.location = "../../home.html"
  }
});



// logging out
const logoutButton = document.getElementById('logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location = "../../home.html"
        })
        .catch((err) => {
            console.log(err.message);
        })
})



// CREATING FUNCTIONALITY OF THE SUBMIT BUTTON
const newComplaintForm = document.getElementById('complaintForm');
newComplaintForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // getting id from email
  const id = email.substring(0,5); // id contains the ID

  console.log(newComplaintForm.arrival);
  console.log(typeof(newComplaintForm.arrival));
  // adding data to pendingComplaints
  addDoc( collection(db, 'pendingComplaints'), {
    roll: parseInt(id),
    type: newComplaintForm.type.value,
    description: newComplaintForm.description.value
  } ).then( () => {
    alert("Your complaint has been submitted successfully!");
    window.location = "../studentHome.html";
  } )

} );
