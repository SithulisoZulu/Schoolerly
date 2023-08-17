import { collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../firebaseApi.js";
import { notificationsMessage } from "../notifications/messages.js";

var notification = document.getElementById("notification");
var notificationsList = document.getElementById("alertNotifications");
var message = document.getElementById("error-message");
let userEmail =  sessionStorage.getItem("userEmail");

export async function getNotifications()
{
    var notifications = [];
    var data = document.getElementById("data");
    const Query = query(collection(db, "usernotifications"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    {
        notifications.push(doc.data())
        console.log(notifications)


        var message;
        if (doc.data().message.split(/\S+/).length > 15)
        {
            message = "view details"
        }
        else
        {
            message = doc.data().message
        }

        for(let i = 0; i < notifications.length; i++ )
        {
            var notification = 
            `
                <div class="alert alert-dark alert-dismissible fade show" role="alert" >
                    <div class="d-flex justify-content-between position-relative">
                        <div class="d-sm-flex">
                            <!-- Avatar -->
                            <div class="avatar avatar-md flex-shrink-0">
                                <img class="avatar-img rounded-circle" src="${notifications[i].photo}" alt="avatar" width="40" height="40">
                            </div>
                            <!-- Info -->
                            <div class="ms-0 ms-sm-2 mt-2 mt-sm-0">
                                <h6  class="mb-0 fw-bolder text-capitalize"><a href="#" class="stretched-link text-white text-decoration-none">${notifications[i].from}</a></h6>
                                <p class="mb-0 mt-2">${message}</p>
                                <span class="small text-light">9 hour ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        data.innerHTML += notification;
    });
    if(notifications.length > 0)
    {
        notification.classList.remove("visually-hidden")
    }
    else
    {
        notificationsList.classList.remove("visually-hidden")
        message.innerHTML = notificationsMessage.NoNotifications;
    }
}

getNotifications();