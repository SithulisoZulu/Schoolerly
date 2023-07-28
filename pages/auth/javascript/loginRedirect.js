import {collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import {db } from "/javascript/firebaseApi.js";
import Roles from "/javascript/roles.js";

var userRole
let userEmail =  sessionStorage.getItem("currentUser");

const myTimeout = setTimeout(checkCurrentUser, 1000);
async function checkCurrentUser(){
  var user = []
  const q = query(collection(db, "users"), where("email", "==", userEmail));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => 
    {
      user.push(doc.data())
      userRole = doc.data().Role

      if( userRole == Roles[0])
      {
        location.replace("/pages/admin/home.html");
      }
      else if( userRole == Roles[1])
      {
        location.replace("/pages/auth/forgotpassword.html");
      }
      else{
        location.replace("/pages/error/userRoleError.html");
      }
  });
  if(user.length <=  0)
  {
    location.replace("/pages/error/userRoleError.html");
  }
}