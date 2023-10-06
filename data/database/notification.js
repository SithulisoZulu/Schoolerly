import {  doc, deleteDoc, query, collection, getDocs, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../libraries/firebaseApi.js";

export const deleteNotifications = async (id) => {
    try {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error('Invalid ID');
        }
        const docRef = await deleteDoc(doc(db, "usernotifications", id));
        return { success: true, message: "Course deleted successfully", course: docRef };
    } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
    }
}

export const getNotificationById = async (id) => {
    const Query = query(collection(db, "usernotifications"), where("id", "==", id));
    const notifications = await getDocs(Query);
    const docRef = notifications.docs.map(doc => doc.id);
    const notificationData = notifications.docs.map(doc => doc.data());
    const notification = notificationData[0];
    const docId = docRef[0]
    const notificationObject = {
        notification: notification,
        docId: docId,
      };
    return notificationObject
}