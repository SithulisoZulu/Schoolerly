import { collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../firebaseApi.js";
import { notificationsMessage } from "../notifications/messages.js";
import { user } from "../../utils/Session.js";
import { checkCurrentUser } from "./user/userApi.js";
import { openModal } from "../../components/notificationModal.js";
import { GetNotificationById, DeleteNotifications } from '../../controllers/notifications.js'

var notification = document.getElementById("notification");
var notificationsList = document.getElementById("alertNotifications");
var message = document.getElementById("NotificationsMessage");
let number = document.getElementById("number");

const email = user()
const userDetails = await checkCurrentUser(email)

export async function getNotifications()
{
    var notifications = [];
    var data = document.getElementById("data");
    const Query = query(collection(db, "usernotifications"), where("userId", "==", userDetails.id));
    const querySnapshot = await getDocs(Query);
     data.innerHTML  = ""
    querySnapshot.forEach((doc) => 
    {
        notifications.push(doc.data())

        var message;
        if (doc.data().message.split(/\S+/).length > 15)
        {
            message = "View details"
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
                    <div class="d-flex justify-content-between position-relative"  >
                        <div class="d-sm-flex">
                            <!-- Avatar -->
                            <div class="avatar avatar-md flex-shrink-0">
                                <img class="avatar-img rounded-circle" src="${notifications[i].photo}" alt="avatar" width="40" height="40">
                            </div>
                            <!-- Info -->
                            <div class="ms-0 ms-sm-2 mt-sm-0 stretched-link notification" id="${notifications[i].id}" style="cursor: pointer;">
                                <h6  class="mb-0 fw-bolder text-capitalize"><a href="#" class="stretched-link text-white text-decoration-none">${notifications[i].from}</a></h6>
                                <h6  class="mb-0 mt-2" \>${message}</h6>
                                <span>
                                <time class="small text-light timeago" datetime="${notifications[i].time}" ></time>
                                </span>
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
        number.innerHTML = notifications.length
        notification.classList.remove("visually-hidden")
    }
    else
    {
        number.innerHTML = "0"
        message.innerHTML = notificationsMessage.NoNotifications;
        notificationsList.classList.remove("visually-hidden")
    }
}

getNotifications();

function getTimer()
{
    var timer = setInterval(() => {    
        getNotifications()
    }, 60000);
}

getTimer()

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('notification')) {

        const notificationId = e.target.id

        viewNotificationDetails(notificationId)
    }
});

const viewNotificationDetails = async (id) => {
    const Query = query(collection(db, "usernotifications"), where("id", "==", id));
    const notifications = await getDocs(Query);
    const notificationData = notifications.docs.map(doc => doc.data());
    const notification = notificationData[0];
    const modalHolder = document.getElementById("modal")
    const date = notification.time.toDate().toDateString();
    const body = 
    `
        <div class="d-flex justify-content-between position-relative"  >
            <div class="d-sm-flex">
                <!-- Avatar -->
                <div class="avatar avatar-md flex-shrink-0">
                    <img class="avatar-img rounded-circle" src="${notification.photo}" alt="avatar" width="40" height="40">
                </div>
                <!-- Info -->
                <div class="ms-0 ms-sm-2 mt-2 mt-sm-0 stretched-link notification mt-2" id="" style="cursor: pointer;">
                    <h6  class="mb-0 fw-bolder text-capitalize"><a href="#" class="stretched-link text-white text-decoration-none"></a>${notification.from}</h6>
                    <p class="mb-0 mt-2 mt-3" \>${notification.message}</p>
                    <span>
                    <p class="small text-light timeago mt-3" datetime="" >${date}</p>
                    </span>
                </div>
            </div>
        </div>
    ` 
    const modal = await openModal(body, notification.id)
    modalHolder.innerHTML = modal
    $("#notificationModal").modal('show')

    return notification
}

document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('mark')) {
    const notificationId = e.target.id
    const notificationDoc =  notificationId

    const notification = await GetNotificationById(notificationDoc)

    const deleteNotifications =  await DeleteNotifications(notification.docId)
    location.reload()
    }
});