import { deleteDoc, doc, updateDoc, query, getDocs, collection, limit, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from '../../libraries/firebaseApi.js';

export const getStudentApplication = async (Email) => {
    if (Email === null || Email === undefined) {
        throw new Error("Invalid userEmail");
    }
    const userQuery = query(collection(db, "studentApplications"), where("email", "==", Email), limit(1));
    try {
        const querySnapshot = await getDocs(userQuery);
        const applicationData = querySnapshot.docs.map(doc => doc.data());
        return await applicationData[0];
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export const getApplicationDetailsById = async (Id) => {
    if (Id === null || Id === undefined) {
        throw new Error("Invalid userEmail");
    }
    const userQuery = query(collection(db, "studentApplications"), where("id", "==", Id), limit(1));
    try {
        const querySnapshot = await getDocs(userQuery);
        const applicationData = querySnapshot.docs.map(doc => doc.data());
        return await applicationData[0];
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}