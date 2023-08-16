import {collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../../libraries/firebaseApi.js";
import { route } from "../../../routers/router.js";

var userRole, userid, userIddHolder
const userEmail = sessionStorage.getItem("userEmail")

export let id = document.getElementById("userId")
let email = document.getElementById("email")

async function checkCurrentUser(){
    var user = []
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => 
      {
        user.push(doc.data())
        userid = doc.data().id 
  
        id.value = doc.id
        email.value = doc.data().email
    });
    if(user.length <=  0)
    {
      location.replace(route.UserRolePageUrl);
    }
}

checkCurrentUser()