import { deleteDoc, doc, updateDoc, query, getDocs, collection, limit, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from '../../libraries/firebaseApi.js';
import userRoles from "../../libraries/roles.js";
import { getUserDataByEmail} from "../../libraries/Api/user/getUserData.js";

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

export const getInstructorByEmail = async (email) => {
    console.log(email)
    try {
        const userData = await getUserDataByEmail(email);
        if (!userData) {
          throw new Error("status 404:  Error occurred while checking current user: User not found");
        }
        return userData;
      } catch (error) {
        throw error;
      }
}
