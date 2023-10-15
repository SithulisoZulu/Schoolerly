import { getCouponByCode } from "../data/database/coupon.js"
export const GetCouponByCode = async (code) => {
    if(!code)
    {
        throw new   Error("Invalid coupon Code")
    };
    const coupon = await getCouponByCode(code);
    return coupon;
}