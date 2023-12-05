import { collection, addDoc, Timestamp, updateDoc, doc, query, getDocs, where, limit, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL  as db, app } from '../../../libraries/firebaseApi.js'
import courseStatues from '../../../libraries/courseStatuses.js';


//Get all courses
export const getAllCourses = async () => {
    try {
        const Query = query(collection(db, "courses"), where("status", "==", courseStatues.Live));
        const querySnapshot = await getDocs(Query);
        const allCourses = querySnapshot.docs.map(doc => doc.data());
        return allCourses;
    } catch (error) {
        console.error("Error getting All course:", error);
        throw error;
    };
}

export const getCourseLevelById = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "levels"), where("id", "==", Id));
        const querySnapshot = await getDocs(Query);
        const levelData = querySnapshot.docs.map(doc => doc.data());
        const level = levelData[0];   
        return level
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
}

export const getAllCourseReviews = async (Id) => {
    try {
        const Query = query(collection(db, "reviews"), where("courseId", "==", Id));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting All reviews:", error);
        throw error;
    };
}