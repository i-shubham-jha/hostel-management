import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, deleteDoc, onSnapshot, query, where} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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

// pending leaves button
document.getElementById('pendingButton').addEventListener("click", pendingButtonEventHandler);

// pending button event handler
function pendingButtonEventHandler()
{
  document.getElementById('pendingButton').classList.toggle('active');
  document.getElementById('pastButton').classList.toggle('active');
  document.getElementById('pendingLeavesDiv').classList.toggle('hidden');
  document.getElementById('pastLeavesDiv').classList.toggle('hidden');
}


// previous leave button
document.getElementById('pastButton').addEventListener("click", pastButtonEventHandler);

// pending button event handler
function pastButtonEventHandler()
{
  document.getElementById('pendingButton').classList.toggle('active');
  document.getElementById('pastButton').classList.toggle('active');
  document.getElementById('pendingLeavesDiv').classList.toggle('hidden');
  document.getElementById('pastLeavesDiv').classList.toggle('hidden');
}


/********************DB SECTION BEINGS****************/


const pendingLeavesTable = document.getElementById('pendingLeavesTable')

const db = getFirestore(app); // init services


// getting all the docs from the pendling Leaves table for showing in the table
const querySnapshot = await getDocs(collection(db, "pendingComplaints"));
querySnapshot.forEach((doc) => {
  // add a new row
  var row = pendingLeavesTable.insertRow(-1); // as 0th is the header

  // inserting new cells in the above row.
  // also simultaneously adding data into them

  var cell1 = row.insertCell(0);
  cell1.innerHTML = doc.data().roll;

  var cell2 = row.insertCell(1);
  cell2.innerHTML = doc.data().type;

  var cell3 = row.insertCell(2);
  cell3.innerHTML = doc.data().description;

  row.insertCell(3).innerHTML = 'Pending';


  var cell5 = row.insertCell(4);
  // create a new anchor element
  let anchor = document.createElement('a');

  //create a text node and assign it to the "link" variable.
  let textNode = document.createTextNode("View more...");

  // Append the textNode as a child to anchor.
  anchor.appendChild(textNode);

  // give the anchor a link to point to
  anchor.href = "complaintResolution.html?id=" + doc.id;

  // append this anchor to the cell
  cell5.appendChild(anchor);
});



const querySnapshot1 = await getDocs(collection(db, "pastComplaints"));
querySnapshot1.forEach((doc) => {
  // add a new row
  var row = document.getElementById('pastLeavesTable').insertRow(-1); // as 0th is the header

  // inserting new cells in the above row.
  // also simultaneously adding data into them

  var cell1 = row.insertCell(0);
  cell1.innerHTML = doc.data().roll;

  var cell2 = row.insertCell(1);
  cell2.innerHTML = doc.data().type;

  var cell3 = row.insertCell(2);
  cell3.innerHTML = doc.data().description;

  row.insertCell(3).innerHTML = 'Resolved';


  var cell5 = row.insertCell(4);
  // create a new anchor element
  let anchor = document.createElement('a');

  //create a text node and assign it to the "link" variable.
  let textNode = document.createTextNode("View more...");

  // Append the textNode as a child to anchor.
  anchor.appendChild(textNode);

  // give the anchor a link to point to
  anchor.href = "complaintResolution.html?id=" + doc.id;

  // append this anchor to the cell
  cell5.appendChild(anchor);
});
