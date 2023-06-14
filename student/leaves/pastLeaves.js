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
    fillPastLeavesTable(id); // calling this function with the id of the student for finding the past leaves
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


async function fillPastLeavesTable(a)
{
    const table = document.getElementById('pastLeavesTable');
    const q = query(collection(db, 'pastLeaves'), where("roll", "==", a) );
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        var row = pendingLeavesTable.insertRow(-1);

        var cell2 = row.insertCell(0);
        let departureTime = doc.data().departure;

        const fireBaseTime = new Date(
            departureTime.seconds * 1000 + departureTime.nanoseconds / 1000000,
        );
        const date = fireBaseTime.toDateString();
        const atTime = fireBaseTime.toLocaleTimeString();

        cell2.innerHTML = date + " " + atTime;


        var cell3 = row.insertCell(1);

        let arrivalTime = doc.data().arrival;

        const fireBaseTime1 = new Date(
            arrivalTime.seconds * 1000 + arrivalTime.nanoseconds / 1000000,
        );
        const date1 = fireBaseTime1.toDateString();
        const atTime1 = fireBaseTime1.toLocaleTimeString();

        cell3.innerHTML = date1 + " "  + atTime1;

        var cell4 = row.insertCell(2);

        const x = doc.data().attendeeApproval

        if(x == 0)
        {
          cell4.innerHTML = 'Pending'
        }
        else if (x == 1)
        {
          cell4.innerHTML = 'Approved'
        }
        else // x== -1
        {
          cell4.innerHTML = 'Rejected'
        }

        // var cell5 = row.insertCell(3);
        // cell5.innerHTML = doc.data().wardenApproval;

        var cell6 = row.insertCell(3);
        cell6.innerHTML = doc.data().reason;
    });

}
