// trying to get the id in the url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')// this id contains the id passed in the url

//some firebase configs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, deleteDoc, onSnapshot, query, where, setDoc, updateDoc, getCountFromServer} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
  // enter your own firbase config and API keys here
};

const app = initializeApp(firebaseConfig);


/***************AUTH SECTION BEGINS***************/
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



/********************DB SECTION BEINGS****************/
const db = getFirestore(app); // init services


/*************FILLING DATA IN THE FIELDS***********/
const pendingLeavesDocRef = doc(db, 'pendingLeaves', id);
const studentDetailsDocRef = doc(db, 'studentDetails', id);

// snapshots of the data
const pendingLeavesDocSnap = await getDoc(pendingLeavesDocRef);
const studentDetailsDocSnap = await getDoc(studentDetailsDocRef);


if (studentDetailsDocSnap.exists()) {
    // data found, now lets put it into the form
    document.getElementById('name').innerHTML = studentDetailsDocSnap.data().name;
    document.getElementById('roll').innerHTML = studentDetailsDocSnap.data().roll;
    document.getElementById('phone').innerHTML = studentDetailsDocSnap.data().phoneNumber;
    document.getElementById('parentsPhone').innerHTML = studentDetailsDocSnap.data().parentsPhoneNumber;
    document.getElementById('address').innerHTML = studentDetailsDocSnap.data().Address;
    document.getElementById('roomNO').innerHTML = studentDetailsDocSnap.data().roomNO;
    document.getElementById('hostel').innerHTML = studentDetailsDocSnap.data().hostel;

} else {
  console.log("No such document in student details!");
}


if (pendingLeavesDocSnap.exists()) {
    // data found, now lets put it into the form
    document.getElementById('reason').innerHTML = pendingLeavesDocSnap.data().reason;

    let arrivalTime = pendingLeavesDocSnap.data().arrival;

    const fireBaseTime1 = new Date(
        arrivalTime.seconds * 1000 + arrivalTime.nanoseconds / 1000000,
    );
    const date1 = fireBaseTime1.toDateString();
    const atTime1 = fireBaseTime1.toLocaleTimeString();

    document.getElementById('arrival').innerHTML = date1 + " "  + atTime1;

    let departureTime = pendingLeavesDocSnap.data().departure;

    const fireBaseTime2 = new Date(
        departureTime.seconds * 1000 + departureTime.nanoseconds / 1000000,
    );
    const date2 = fireBaseTime2.toDateString();
    const atTime2 = fireBaseTime2.toLocaleTimeString();

    document.getElementById('departure').innerHTML = date2 + " "  + atTime2;
} else {
  console.log("No such document in pending Leaves!");
}



// count of previous leaves
const coll = collection(db, "pastLeaves");
const q = query(coll, where("roll", "==", parseInt(id)));
const snapshot = await getCountFromServer(q);
document.getElementById('countOfPrevLeaves').innerHTML = snapshot.data().count





/***********FILLING DATA IN FIELDS FINISHED************/


/********************DB SECTION ENDS****************/







/*************APPROVAL/REJECT BUTTONS BEGINS**************/

// THE REJECT BUTTON

// reject button event listener
document.getElementById('rejectButton').addEventListener("click", rejectButtonHandlerFunction);

// reject button handler function
async function rejectButtonHandlerFunction () {
  const ref = doc(db, 'pendingLeaves', id); // reference to the document
  await updateDoc(ref, {attendeeApproval: -1});
  await moveToPastLeaves(); // moving current leave to past leave collection
  window.location = "../leavesHome.html";
}


// THE APPROVE BUTTON

// approve button event listener
document.getElementById('approveButton').addEventListener("click", approveButtonHandlerFunction);

// approve button event handler
async function approveButtonHandlerFunction() {
  const ref = doc(db, 'pendingLeaves', id); // reference to the document
  await updateDoc(ref, {attendeeApproval: 1});
  await moveToPastLeaves(); // moving current leave to past leaves collection
  window.location = "../leavesHome.html";
}

async function moveToPastLeaves()
{
  // creating a new doc in the past leaves collection and copying data into it
  console.log('reached in move to past leaves function');
  const pendingLeavesDocSnap1 = await getDoc(pendingLeavesDocRef);
  await addDoc( collection(db, 'pastLeaves'), {
    arrival: pendingLeavesDocSnap1.data().arrival,
    departure: pendingLeavesDocSnap1.data().departure,
    reason: pendingLeavesDocSnap1.data().reason,
    roll: pendingLeavesDocSnap1.data().roll,
    attendeeApproval: pendingLeavesDocSnap1.data().attendeeApproval,
    wardenApproval: pendingLeavesDocSnap1.data().wardenApproval
  } );

  // deleting this entry from the pending leaves collection
  await deleteDoc( doc(db, 'pendingLeaves', id) );
}

/************APPROVAL/REJECT BUTTONS ENDS*****************/







