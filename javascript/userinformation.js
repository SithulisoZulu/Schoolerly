import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4TJ6cXs0i0viuY-2Y_LZznJA9Evh6-jY",
  authDomain: "schoolerly-1d189.firebaseapp.com",
  databaseURL: "https://schoolerly-1d189-default-rtdb.firebaseio.com",
  projectId: "schoolerly-1d189",
  storageBucket: "schoolerly-1d189.appspot.com",
  messagingSenderId: "193080253000",
  appId: "1:193080253000:web:17f3d09bd4d79b66dd567d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


var userRole
var userName;
var userSurname;
let userNameHolder = document.getElementById('username');
// let userSurnameHolder = document.getElementById('usersurname');
let userRoleHolder = document.getElementById('userRole');
let currentUser =  sessionStorage.getItem("currentUser");

async function getUserInfoByEmail(){
  const q = query(collection(db, "users"), where("email", "==", currentUser));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => 
    {
      userName = doc.data().Name
      userRole = doc.data().Role
      userSurname = doc.data().Surname

      userNameHolder.innerHTML = userName
      // userSurnameHolder.innerHTML = userSurname
      userRoleHolder.innerHTML = userRole
    });
}

getUserInfoByEmail();