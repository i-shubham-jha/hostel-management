import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getCountFromServer, getFirestore, doc, getDoc, getDocs, collection, addDoc, deleteDoc, onSnapshot, query, where} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUfqyLzc9d9WOSwXVdqhJoUMSCcCTV9xM",
  authDomain: "hostel-management-system-70942.firebaseapp.com",
  projectId: "hostel-management-system-70942",
  storageBucket: "hostel-management-system-70942.appspot.com",
  messagingSenderId: "552250191673",
  appId: "1:552250191673:web:607cf0a580d375bab182e8"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // alert then redirect
    alert("Please Log In, redirecting to home page....");
    window.location = "../home.html"
  }
});


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





/************THE DB PART***********/
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// getting the counts of pending leaves and complaints
const pendingLeavesObject = collection(db, "pendingLeaves");
const countOfPendingLeaves = await getCountFromServer(pendingLeavesObject);

const pendingComplaintsObject = collection(db, "pendingComplaints");
const countOfPendingComplaints = await getCountFromServer(pendingComplaintsObject);

// updating the leaves and complaints section with their respective counts
document.getElementById("xleaves").innerHTML = countOfPendingLeaves.data().count;
document.getElementById("xComplaints").innerHTML = countOfPendingComplaints.data().count;

