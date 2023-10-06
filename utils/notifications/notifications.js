import { Timestamp, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from '../../libraries/firebaseApi.js'
import notification from '../../libraries/systemNotifications.js'
export const notifications = async (id)  => {
  await addDoc(collection(db, "usernotifications"), {
    id: notification.id,
    from: notification.from,
    message: notification.message,
    photo: notification.photo,
    userId: id,
    time: Timestamp.fromDate(new Date()),
  }).catch((error) => {
  console.log(error)
  }) 
}