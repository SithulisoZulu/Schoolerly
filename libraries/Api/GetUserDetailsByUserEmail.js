import {collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../../libraries/firebaseApi.js";
import { route } from "../../../routers/router.js";

var userid
const userEmail = sessionStorage.getItem("userEmail")

var avatar = document.getElementById("image");
let userNameHolder = document.getElementById('username');
let userRoleHolder = document.getElementById('userRole');


let userNameHolder2 = document.getElementById('username2');
let userRoleHolder2 = document.getElementById('userRole2');


async function checkCurrentUser(){
    var user = []
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => 
      {
        user.push(doc.data())
        userid = doc.data().id 
        avatar.src = doc.data().photo
        userNameHolder.innerHTML = doc.data().Name
        userRoleHolder.innerHTML = doc.data().Role                                                                                                                                                                                                  
        userNameHolder2.innerHTML = doc.data().Name
        userRoleHolder2.innerHTML = doc.data().Role                                                                                                                                                                                                  
    });
    if(user.length <=  0)
    {
      location.replace(route.UserRolePageUrl);
    }
}

checkCurrentUser()