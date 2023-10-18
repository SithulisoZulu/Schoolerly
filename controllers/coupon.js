import { addCoupon, decrementCouponQuantityInDatabase, deleteCoupon, getCouponByCode, getCouponDocIdByCode, getInstructorCoupons, updateCoupon } from "../data/database/coupon.js"
export const GetCouponByCode = async (code) => {
    if(!code)
    {
        throw new   Error("Invalid coupon Code")
    };
    const coupon = await getCouponByCode(code);
    return coupon;
}

export const  AddCoupon  = async(coupon) => {
    if(!coupon)
    {
        throw new Error("Invalid coupon");
    }
    const couponData =  await addCoupon(coupon);
    return couponData;
}
export const DecrementCouponQuantityInDatabase = async (code, updatedQuantity) => {
    console.log(code, updatedQuantity)
    if(!code && updatedQuantity >= 0)
    {
        throw new Error("No coupon Id or updatedQuantity found")
    }

    const couponDocId = await getCouponDocIdByCode(code)
    const coupon = await  decrementCouponQuantityInDatabase(couponDocId, updatedQuantity);
    return coupon;
}

export const GetInstructorCoupons = async (Id) => {
    if(!Id) throw new Error('Invalid Id Parameter')
    return await getInstructorCoupons(Id)
}

export const DeleteCoupon = async (couponCode) => {
    const couponDocId = await getCouponDocIdByCode(couponCode)
    if(!couponCode) throw new Error ('Could not delete Coupon Invalid Coupon Code');
    return await deleteCoupon(couponDocId);
}

export const UpdateCoupon = async (updatedCoupon, couponCode) => {
    if(!updatedCoupon) throw new Error ('Could not update Coupon Invalid coupon code');
    const couponDocId = await getCouponDocIdByCode(couponCode);
    return await updateCoupon(updatedCoupon, couponDocId);
}