import { deleteDoc, doc, updateDoc, query, getDocs, collection, limit, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from '../../libraries/firebaseApi.js';
import userRoles from "../../libraries/roles.js";

export const getAllInstructors = async () => {
    try {
        const Query = query(collection(db, "users"), where("Role", "==", userRoles.Instructor));
        const querySnapshot = await getDocs(Query);
        const allInstructors = querySnapshot.docs.map(doc => doc.data());
        return allInstructors;
    } catch (error) {
        console.error("Error getting All Instructors:", error);
        throw error;
    };
}