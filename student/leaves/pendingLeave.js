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
    const id = email.substring(0,5);
    ifPendingLeaveExist(id);
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


async function ifPendingLeaveExist(id)
{
    const docRef = doc(db, "pendingLeaves", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // first fetching the data and filling the table
        document.getElementById('reason').innerHTML = docSnap.data().reason ;


        let arrivalTime = docSnap.data().arrival;

        const fireBaseTime1 = new Date(
            arrivalTime.seconds * 1000 + arrivalTime.nanoseconds / 1000000,
        );
        const date1 = fireBaseTime1.toDateString();
        const atTime1 = fireBaseTime1.toLocaleTimeString();

        document.getElementById('arrival').innerHTML = date1 + " "  + atTime1;

        let departureTime = docSnap.data().departure;

        const fireBaseTime2 = new Date(
            departureTime.seconds * 1000 + departureTime.nanoseconds / 1000000,
        );
        const date2 = fireBaseTime2.toDateString();
        const atTime2 = fireBaseTime2.toLocaleTimeString();

        document.getElementById('departure').innerHTML = date2 + " "  + atTime2;



        // finally un/hiding the required divs
        spinnerDiv.classList.toggle('hidden');
        ifPendingDiv.classList.toggle('hidden');
    } else {
        // doc.data() will be undefined in this case
        spinnerDiv.classList.toggle('hidden');
        ifNotPendingDiv.classList.toggle('hidden');
    }

}

