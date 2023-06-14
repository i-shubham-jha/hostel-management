import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, deleteDoc, onSnapshot, query, where, setDoc, updateDoc, getCountFromServer} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    const email = user.email;
    const id = parseInt(email.substring(0,5));
    ifPendingComplaintExist(id);
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
            window.location = "../../../home.html"
        })
        .catch((err) => {
            console.log(err.message);
        })
})

/*******************AUTH SECTION ENDS*******************/



/***********************DB SECTION************/

// references to various divs to be un/hidden
const spinnerDiv = document.getElementById('spinnerDiv');
const ifPendingDiv = document.getElementById('ifPending');
const ifNotPendingDiv = document.getElementById('ifNotPending');
const table = document.getElementById('pendingComplaintsTable');

async function ifPendingComplaintExist(id)
{
    ;
    const q = query(collection(db, "pendingComplaints"), where("roll", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot)
    {
        querySnapshot.forEach((doc) => {
            const row = table.insertRow(-1);

            const cell1 = row.insertCell(0) ;
            cell1.innerHTML = doc.data().type;

            var cell2 = row.insertCell(1);
            cell2.innerHTML = doc.data().description;

            // finally un/hiding the required divs

        });
        spinnerDiv.classList.toggle('hidden');
        ifPendingDiv.classList.toggle('hidden');
    }
    else
    {
        spinnerDiv.classList.toggle('hidden');
        ifNotPendingDiv.classList.toggle('hidden');
    }
}
