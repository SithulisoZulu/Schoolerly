import { DecrementCouponQuantityInDatabase, GetCouponByCode } from "../../controllers/coupon.js";

  // Function to check if the coupon has already been applied for the user using local storage
function isCouponAlreadyAppliedLocally(email, coupon) {
    // You can store applied coupons in local storage using the user's email as a key.
    // Make sure to stringify and parse the data to work with local storage.
  const appliedCoupons = JSON.parse(localStorage.getItem(`appliedCoupons_${email}`)) || [];
  return appliedCoupons.includes(coupon.code);
}

  // Function to mark a coupon as applied for the user using local storage
function markCouponAsAppliedLocally(email, coupon) {
  const appliedCoupons = JSON.parse(localStorage.getItem(`appliedCoupons_${email}`)) || [];
  appliedCoupons.push(coupon.code);
  localStorage.setItem(`appliedCoupons_${email}`, JSON.stringify(appliedCoupons));
}

  // Cached references to elements to reduce DOM access
const couponMessage      = document.getElementById('couponErrorHolder');
const loader             = document.getElementById('loader');
const pecElement         = document.getElementById('pec');
const totalElement       = document.getElementById('total');
const disElement         = document.getElementById('dis');
const couponErrorElement = document.getElementById('couponError');
const totElement         = document.getElementById('tot');
const offElement         = document.getElementById('off');

  // Function to apply a coupon with safe logic
export const applyCoupon = async (courseId, code, course, email) => {
  try {
      // Retrieve the coupon from the database
    const coupon = await GetCouponByCode(code);

    if (!coupon) {
      throw new Error('Invalid coupon code.');
    }

    if (coupon.courseId !== courseId) {
      throw new Error('Coupon is not valid for this course.');
    }

    const exDate      = new Date(coupon.date.seconds * 1000 + coupon.date.nanoseconds / 1000000);
    const currentDate = new Date();

    if (exDate < currentDate) {
      throw new Error('Coupon has expired.');
    }

    if (isCouponAlreadyAppliedLocally(email, coupon)) {
      throw new Error('Coupon has already been applied.');
    }

    if (coupon.limit && coupon.quantity <= 0) {
      throw new Error('Coupon has been fully redeemed.');
    }

      // Only decrement the quantity if the coupon has a limit
    if (coupon.limit) {
      const couponId        = coupon.code;
      const updatedQuantity = coupon.quantity - 1;
      await DecrementCouponQuantityInDatabase(couponId, updatedQuantity);
    }

    const discountedPrice = course[0].price * (1 - coupon.discount / 100);
    console.log('Coupon applied successfully! You get a ' + coupon.discount + '% discount. New price: $' + discountedPrice.toFixed(2));
    pecElement.textContent         = coupon.discount;
    totalElement.textContent       = discountedPrice.toFixed(0);
    disElement.textContent         = course[0].price - discountedPrice.toFixed(0);
    couponErrorElement.textContent = 'Coupon applied!';
    couponMessage.classList.remove('text-danger');
    couponMessage.classList.add('text-success');
    couponMessage.classList.remove('visually-hidden');
    totElement.classList.remove('visually-hidden');
    offElement.classList.remove('visually-hidden');

      // Mark the coupon as applied for the user using local storage
    markCouponAsAppliedLocally(email, coupon);

    return discountedPrice;
  } catch (error) {
    console.error('An error occurred while applying the coupon:', error);
    couponErrorElement.textContent = error.message;
    couponMessage.classList.remove('text-success');
    couponMessage.classList.add('text-danger');
    couponMessage.classList.remove('visually-hidden');
  } finally {
    loader.classList.add('visually-hidden');
  }
};
