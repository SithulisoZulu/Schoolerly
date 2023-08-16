import { collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../libraries/firebaseApi.js";

// var userSurname;
let userNameHolder = document.getElementById('username');
let userRoleHolder = document.getElementById('userRole');
let userEmail =  sessionStorage.getItem("currentUser");
var avatar = document.getElementById("image");

export async function getUserInfoByEmail(){
  const Query = query(collection(db, "users"), where("email", "==", userEmail));
  const querySnapshot = await getDocs(Query);
  querySnapshot.forEach((doc) => 
    {
      userNameHolder.innerHTML = doc.data().Name
      userRoleHolder.innerHTML = doc.data().Role
      avatar.src = doc.data().photo    
  });
}

getUserInfoByEmail();