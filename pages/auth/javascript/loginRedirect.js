console.log("connected")
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4TJ6cXs0i0viuY-2Y_LZznJA9Evh6-jY",
    authDomain: "schoolerly-4eaaf.firebaseapp.com",
    databaseURL: "https://schoolerly.firebaseio.com",
    projectId: "schoolerly-4eaaf",
    storageBucket: "schoolerly-4eaaf.appspot.com",
    messagingSenderId: "702702557352",
    appId: "1:609348476417:web:71a15e3f1b5a40434e6a00",
    measurementId: "G-XZ4RHV4T3K"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


var userid = "";
var username = "";
var userRole

let currentUser =  sessionStorage.getItem("currentUser");

// const myTimeout = setTimeout(checkCurrentUser, 5000);



async function checkCurrentUser(){
    const q = query(collection(db, "users"), where("email", "==", currentUser));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => 
      {
        userid = doc.id
        username = doc.data().name
        userRole = doc.data().Role

        console.log(userid + username + userRole)

        // if( userRole == "Developer")
        // {
        //     location.replace("/accessDenied/accessDenied.html");
        // }
        switch (userRole)
        {
            case 0:
                userRole = "Developer"
                location.replace("/accessDenied/accessDenied.html");
                break;
            case 1:
                userRole = "Developer"
                location.replace("/accessDenied/accessDenied.html");
                break;
            default:
                location.replace("/accessDenied/accessDenied.html");
                break;

        }
    });
  }

  



  async function getuser(){
    const q = query(collection(db, "users"), where("email", "==", currentUser));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => 
      {
        userid = doc.id
        username = doc.data().name
        userRole = doc.data().Role

        console.log(userid + username + userRole)
    });
  }


  getuser();