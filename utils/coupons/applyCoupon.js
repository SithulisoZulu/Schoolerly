import { GetCouponByCode } from "../../controllers/coupon.js";

export const  applyCoupon = async (courseId, code, course)  => {
  const coupon = await GetCouponByCode(code);
  const couponMessage = document.getElementById('couponErrorHolder');
  if (coupon) {
    if (coupon.courseId === courseId) {
      // Construct a JavaScript Date object from Firestore Timestamp
      const exDate = new Date(coupon.exDate.seconds * 1000 + coupon.exDate.nanoseconds / 1000000);
      const currentDate = new Date();

      if (exDate >= currentDate) {
        const discountedPrice = course[0].price * (1 - coupon.discount / 100);
        console.log('Coupon applied successfully! You get a ' + coupon.discount + '% discount. New price: $' + discountedPrice.toFixed(2));
        document.getElementById('pec').textContent = coupon.discount
        document.getElementById('total').textContent = discountedPrice.toFixed(0)
        document.getElementById('dis').textContent = course[0].price - discountedPrice.toFixed(0)
        document.getElementById('couponError').textContent = "Coupon applied!."
        couponMessage.classList.remove("text-danger")
        couponMessage.classList.add("text-success")
        couponMessage.classList.remove('visually-hidden')
        document.getElementById('tot').classList.remove("visually-hidden")
        document.getElementById('off').classList.remove("visually-hidden") 
        return discountedPrice;
      } else {
          document.getElementById('couponError').textContent = "Coupon has expired."
          couponMessage.classList.remove('visually-hidden')
      }
    } else {
      document.getElementById('couponError').textContent = "Coupon is not valid for this course."
      couponMessage.classList.remove('visually-hidden')
    }
  } else {
    document.getElementById('couponError').textContent = "Invalid coupon code."
    couponMessage.classList.remove('visually-hidden')
  }
}
