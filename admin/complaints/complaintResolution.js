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


// getting the roll from the complaint document
const docRef = doc(db, "pendingComplaints", id);
const docSnap = await getDoc(docRef);

const roll = docSnap.data().roll;

const pendingComplaintsDocRef = doc(db, 'pendingComplaints', id);
const studentDetailsDocRef = doc(db, 'studentDetails', roll.toString());

// snapshots of the data
const pendingComplaintsDocSnap = await getDoc(pendingComplaintsDocRef);
const studentDetailsDocSnap = await getDoc(studentDetailsDocRef);
//

if (studentDetailsDocSnap.exists()) {
    // data found, now lets put it into the form
    document.getElementById('name').innerHTML = studentDetailsDocSnap.data().name;
    document.getElementById('roll').innerHTML = studentDetailsDocSnap.data().roll;
    document.getElementById('phone').innerHTML = studentDetailsDocSnap.data().phoneNumber;
    document.getElementById('roomNO').innerHTML = studentDetailsDocSnap.data().roomNO;
    document.getElementById('hostel').innerHTML = studentDetailsDocSnap.data().hostel;

} else {
  console.log("No such document in student details!");
}


//
//
//
document.getElementById('type').innerHTML = pendingComplaintsDocSnap.data().type;
document.getElementById('description').innerHTML = pendingComplaintsDocSnap.data().description;



document.getElementById('resolveButton').addEventListener("click", resolveButtonHandlerFunction);

// approve button event handler
async function resolveButtonHandlerFunction() {
  await moveToPastLeaves(); // moving current leave to past leaves collection
  window.location = "complaintHome.html";
}

async function moveToPastLeaves()
{
  // creating a new doc in the past complaints collection and copying data into it
  console.log('reached in move to past complaints function');
  const pendingComplaintsDocSnap1 = await getDoc(pendingComplaintsDocRef);
  await addDoc( collection(db, 'pastComplaints'), {
    roll: pendingComplaintsDocSnap1.data().roll,
    type: pendingComplaintsDocSnap1.data().type,
    description: pendingComplaintsDocSnap1.data().description
  } );

  // deleting this entry from the pending leaves collection
  await deleteDoc( doc(db, 'pendingComplaints', id) );
}

/************APPROVAL/REJECT BUTTONS ENDS*****************/


