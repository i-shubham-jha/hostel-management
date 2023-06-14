import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, deleteDoc, onSnapshot, query, where, setDoc, Timestamp} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUfqyLzc9d9WOSwXVdqhJoUMSCcCTV9xM",
  authDomain: "hostel-management-system-70942.firebaseapp.com",
  projectId: "hostel-management-system-70942",
  storageBucket: "hostel-management-system-70942.appspot.com",
  messagingSenderId: "552250191673",
  appId: "1:552250191673:web:607cf0a580d375bab182e8"
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




// trying to get the email of the currently signed in user
// const user = auth.currentUser;
//
// console.log(user);
//
// if (user)
// {
//   console.log('reached inside function');
//   email = user.email;
// }
// else
// {
//
// }
// console.log("reached");
// console.log(email);


// logging out
const logoutButton = document.getElementById('logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location = "../home.html"
        })
        .catch((err) => {
            console.log(err.message);
        })
})





// CREATING FUNCTIONALITY OF THE SUBMIT BUTTON
const newLeaveForm = document.getElementById('leaveForm');
newLeaveForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // getting id from email
  const id = email.substring(0,5); // id contains the ID

  console.log(newLeaveForm.arrival);
  console.log(typeof(newLeaveForm.arrival));
  // adding data to pendingLeaves
  setDoc( doc(db, 'pendingLeaves', id), {
    arrival: Timestamp.fromDate( new Date(newLeaveForm.arrival.value)),
    departure: Timestamp.fromDate( new Date(newLeaveForm.departure.value)),
    reason: newLeaveForm.reason.value,
    attendeeApproval: 0,
    wardenApproval: 0,
    roll: parseInt(id),
  } ).then( () => {
    alert("Your leave application has been submitted successfully!");
    window.location = "../studentHome.html";
  } )

} );





