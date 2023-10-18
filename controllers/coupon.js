import { addCoupon, decrementCouponQuantityInDatabase, getCouponByCode, getCouponDocIdByCode } from "../data/database/coupon.js"
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