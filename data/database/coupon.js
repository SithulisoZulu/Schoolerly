import { collection, addDoc, Timestamp, updateDoc, doc, query, getDocs, where, limit, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../libraries/firebaseApi.js";
export const getCouponByCode = async (code) => {
    try {
        if (!code) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "coupons"), where("code", "==", code), limit(1));
        const querySnapshot = await getDocs(Query);
        const couponData = querySnapshot.docs.map(doc => doc.data());
        const coupon = couponData[0];  
        return coupon
    } catch (error) {
        console.error("Error getting coupon by code:", error);
        throw error;
    }
}