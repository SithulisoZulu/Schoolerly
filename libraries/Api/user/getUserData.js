import { collection,getDocs, query, where,limit } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../firebaseApi.js";

//Get User Details By Email
export async function getUserDataByEmail(userEmail) {
    debugger
    if (userEmail === null || userEmail === undefined) {
        throw new Error("Invalid userEmail");
    }
    const userQuery = query(collection(db, "users"), where("email", "==", userEmail), limit(1));
    try {
        const querySnapshot = await getDocs(userQuery);
        const userData = querySnapshot.docs.map(doc => doc.data());
        const user = userData[0];
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

//GetUser Socials By Email
export async function  getUserSocials(userEmail){
    if (userEmail === null || userEmail === undefined) {
        throw new Error("Invalid userEmail");
    }
    const socialsQuery = query(collection(db, "socials"), where("userEmail", "==", userEmail), limit(1));
    try {
        const querySnapshot = await getDocs(socialsQuery);
        const userSocials = querySnapshot.docs.map(doc => doc.data());
        const socials = userSocials[0];
        return socials;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

//Get User Doc Id By Email
export async function getUserDocIdByEmail(userEmail) {
    if (userEmail === null || userEmail === undefined) {
        throw new Error("Invalid userEmail");
    }
    const userQuery = query(collection(db, "users"), where("email", "==", userEmail), limit(1));
    try {
        const user = await getDocs(userQuery);
        const userDoc = user.docs.map(doc => doc.id);
        const docId = userDoc[0];
        return docId;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}
