import {collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import {db} from '/javascript/firebaseApi.js' 

var notification = document.getElementById("notification");
let currentUser =  sessionStorage.getItem("currentUser");

export async function getNotifications()
{
    var notifications = [];
    const q = query(collection(db, "usernotifications"), where("email", "==", currentUser));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => 
    {
        notifications.push(doc.data())
    });
    if(notifications.length > 0)
    {
        notification.classList.remove("visually-hidden")
    }
}

getNotifications()