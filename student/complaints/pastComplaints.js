import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, deleteDoc, onSnapshot, query, where} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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



/***************AUTH SECTION BEGINS***************/
const auth = await getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    const email = user.email;
    const id = parseInt(email.substring(0,5));
    fillPastComlaintsTable(id); // calling this function with the id of the student for finding the past leaves
    // ...
  } else {
    // User is signed out
    // alert then redirect
    alert("Please Log In, redirecting to home page....");
    window.location = "../../../home.html"
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

/*******************AUTH SECTION ENDS*******************/



async function fillPastComlaintsTable(a)
{
    const table = document.getElementById('pendingLeavesTable');
    const q = query(collection(db, 'pastComplaints'), where("roll", "==", a) );
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        var row = pendingLeavesTable.insertRow(-1);

        var cell1 = row.insertCell(0);
        cell1.innerHTML = doc.data().type;

        var cell2 = row.insertCell(1);
        cell2.innerHTML = doc.data().description;
    });

}
