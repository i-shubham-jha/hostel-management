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

/********************TOGGLING BETWEEN TABLES BEGINS******/



/********************TOGGLING BETWEEN TABLES ENDS********/

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
const querySnapshot = await getDocs(collection(db, "pendingLeaves"));
querySnapshot.forEach((doc) => {
  // add a new row
  var row = pendingLeavesTable.insertRow(-1); // as 0th is the header

  // inserting new cells in the above row.
  // also simultaneously adding data into them

  var cell1 = row.insertCell(0);
  cell1.innerHTML = doc.data().roll;

  var cell2 = row.insertCell(1);

  let departureTime = doc.data().departure;

  const fireBaseTime = new Date(
    departureTime.seconds * 1000 + departureTime.nanoseconds / 1000000,
  );
  const date = fireBaseTime.toDateString();
  const atTime = fireBaseTime.toLocaleTimeString();

  cell2.innerHTML = date + " " + atTime;


  var cell3 = row.insertCell(2);

  let arrivalTime = doc.data().arrival;

  const fireBaseTime1 = new Date(
    arrivalTime.seconds * 1000 + arrivalTime.nanoseconds / 1000000,
  );
  const date1 = fireBaseTime1.toDateString();
  const atTime1 = fireBaseTime1.toLocaleTimeString();

  cell3.innerHTML = date1 + " "  + atTime1;

  var cell4 = row.insertCell(3);
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


  // var cell5 = row.insertCell(4);
  // cell5.innerHTML = doc.data().wardenApproval;

  var cell6 = row.insertCell(4);
  // create a new anchor element
  let anchor = document.createElement('a');

  //create a text node and assign it to the "link" variable.
  let textNode = document.createTextNode("View more...");

  // Append the textNode as a child to anchor.
  anchor.appendChild(textNode);

  // give the anchor a link to point to
  anchor.href = "leavesSanction/leavesSanctionPage.html?id=" + doc.data().roll;

  // append this anchor to the cell
  cell6.appendChild(anchor);
});

// getting all the docs from the past leaves table for showing in the table
const pastQuerySnapshot = await getDocs(collection(db, 'pastLeaves'));
pastQuerySnapshot.forEach((doc) => {
  // add a new row
  var row = document.getElementById('pastLeavesTable').insertRow(-1); // as 0th is the header

  // inserting new cells in the above row.
  // also simultaneously adding data into them

  var cell1 = row.insertCell(0);
  cell1.innerHTML = doc.data().roll;

  var cell2 = row.insertCell(1);

  let departureTime = doc.data().departure;

  const fireBaseTime = new Date(
    departureTime.seconds * 1000 + departureTime.nanoseconds / 1000000,
  );
  const date = fireBaseTime.toDateString();
  const atTime = fireBaseTime.toLocaleTimeString();

  cell2.innerHTML = date + " " + atTime;


  var cell3 = row.insertCell(2);

  let arrivalTime = doc.data().arrival;

  const fireBaseTime1 = new Date(
    arrivalTime.seconds * 1000 + arrivalTime.nanoseconds / 1000000,
  );
  const date1 = fireBaseTime1.toDateString();
  const atTime1 = fireBaseTime1.toLocaleTimeString();

  cell3.innerHTML = date1 + " "  + atTime1;

  var cell4 = row.insertCell(3);
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

  // var cell5 = row.insertCell(4);
  // cell5.innerHTML = doc.data().wardenApproval;

  var cell6 = row.insertCell(4);
  // create a new anchor element
  let anchor = document.createElement('a');

  //create a text node and assign it to the "link" variable.
  let textNode = document.createTextNode("View more...");

  // Append the textNode as a child to anchor.
  anchor.appendChild(textNode);

  // give the anchor a link to point to
  anchor.href = "leavesSanction/leavesSanctionPage.html?id=" + doc.data().roll;

  // append this anchor to the cell
  cell6.appendChild(anchor);
} );

/********************DB SECTION ENDS****************/
