import { generateCouponCode } from "./generateCouponCode.js";

// Define an object to store course coupons
const courseCouponData = {};

// Function to create a new coupon with a discount
export function createCoupon(courseId, validDays, discountPercent) {
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getTime());
  expirationDate.setDate(currentDate.getDate() + validDays);

  const couponCode = generateCouponCode();
  const couponData = {
    code: couponCode,
    courseId: courseId,
    expires: expirationDate,
    discount: discountPercent,
  };

  courseCouponData[couponCode] = couponData;

  return courseCouponData;
}
