import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, deleteDoc, onSnapshot, query, where, setDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUfqyLzc9d9WOSwXVdqhJoUMSCcCTV9xM",
  authDomain: "hostel-management-system-70942.firebaseapp.com",
  projectId: "hostel-management-system-70942",
  storageBucket: "hostel-management-system-70942.appspot.com",
  messagingSenderId: "552250191673",
  appId: "1:552250191673:web:607cf0a580d375bab182e8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // init services


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




const newUserForm = document.getElementById('newUserForm');

newUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // creating the user with the email and password
    createUserWithEmailAndPassword(auth, newUserForm.email.value, newUserForm.password.value).then(() => {
        addStudentDetails();
        alert('Student ' + newUserForm.name.value + ' added successfully!');
        newUserForm.reset();
    })
});

async function addStudentDetails()
{
    await setDoc( doc(db, 'studentDetails', newUserForm.roll.value ), {
            Address: newUserForm.Address.value,
            hostel: newUserForm.hostel.value,
            name: newUserForm.name.value,
            parentsPhoneNumber: parseInt(newUserForm.parentsPhoneNumber.value),
            phoneNumber: parseInt(newUserForm.phone.value),
            roll: parseInt(newUserForm.roll.value),
            roomNO: parseInt(newUserForm.roomNO.value)
    });
}
