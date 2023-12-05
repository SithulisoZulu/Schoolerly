import { collection, addDoc, Timestamp, updateDoc, doc, query, getDocs, where, limit, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../libraries/firebaseApi.js";
export const getCouponByCode = async (code) => {
    try {
        if (!code) {
            throw new Error("Invalid Id parameter");
        }
        const Query         = query(collection(db, "coupons"), where("code", "==", code), limit(1));
        const querySnapshot = await getDocs(Query);
        const couponData    = querySnapshot.docs.map(doc => doc.data());
        const coupon        = couponData[0];
        return coupon
    } catch (error) {
        console.error("Error getting coupon by code:", error);
        throw error;
    }
}

export const getCouponDocIdByCode = async (code) => {
    if (!code) {
        throw new Error("Invalid code");
    }
    const userQuery = query(collection(db, "coupons"), where("code", "==", code), limit(1));
    try {
        const coupon    = await getDocs(userQuery);
        const couponDoc = coupon.docs.map(doc => doc.id);
        const docId     = couponDoc[0];
        return docId;
    } catch (error) {
        console.error("Error fetching coupon data:", error);
        throw error;
    }
}

export const  addCoupon  = async(coupon) => {

    return addDoc(collection(db, "coupons"), {
        courseId    : coupon.courseId,
        name        : coupon.name,
        discount    : coupon.discount,
        quantity    : coupon.quantity,
        instructorId: coupon.instructorId,
        code        : coupon.code,
        limit       : coupon.limit,
        date        : coupon.date
    }).then((docRef) => {
        return coupon;
    });
}

export const decrementCouponQuantityInDatabase  = async (id, updatedQuantity) => {
    try {
        const updateRef = doc(db, "coupons", id);

        await updateDoc(updateRef, {
            quantity: updatedQuantity
        });
        return true;
    } catch (error) {
        console.error("Error updating Coupon:", error);
        return false;
    }
}

export const getInstructorCoupons = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query         = query(collection(db, "coupons"), where("instructorId", "==", Id));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting coupon by code:", error);
        throw error;
    }
}

export const deleteCoupon = async (couponDocId) => {
    try {
        if (!couponDocId) {
            throw new Error('Invalid Code');
        }
        const docRef = await deleteDoc(doc(db, "coupons", couponDocId));
        return { success: true, message: "Coupon deleted successfully", course: docRef };
    } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
    }
}

export const updateCoupon = async (updatedCoupon, couponDocId) => {
    const jsDate    = new Date();
    const updatedAt = Timestamp.fromDate(jsDate);
    try {
        await updateDoc(doc(db, 'coupons', couponDocId), {
        courseId : updatedCoupon.courseId,
        name     : updatedCoupon.name,
        discount : updatedCoupon.discount,
        quantity : updatedCoupon.quantity,
        limit    : updatedCoupon.limit,
        date     : updatedCoupon.date,
        updatedAt: updatedAt
      }); 
      return { success: true, message: "Coupon updated successfully"};
    } catch (error) {
        console.log(error)
    }
}