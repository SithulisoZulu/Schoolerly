import {collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../../libraries/firebaseApi.js";
import { route } from "../../../routers/router.js";
import userRoles from "../../../libraries/roles.js";

var userRole, userId
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
      userId = doc.data().id
      

      if( userRole == userRoles.Admin)
      {
        location.replace(route.adminHomePageUrl);
      }
      else if( userRole == userRoles.Unverified)
      {
        sessionStorage.setItem("userId", userId);
        location.replace(route.CompleteProfilePageUrl);
      }
      else{
        location.replace(route.UserRolePageUrl);
      }
  });
  if(user.length <=  0)
  {
    location.replace(route.UserRolePageUrl);
  }
}