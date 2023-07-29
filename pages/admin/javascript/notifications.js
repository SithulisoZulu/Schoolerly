import { collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../../libraries/firebaseApi.js";

var notification = document.getElementById("notification");
let userEmail =  sessionStorage.getItem("currentUser");

export async function getNotifications()
{
    var notifications = [];
    const Query = query(collection(db, "usernotifications"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        notifications.push(doc.data())
    });
    if(notifications.length > 0)
    {
        notification.classList.remove("visually-hidden")
    }
}

getNotifications();