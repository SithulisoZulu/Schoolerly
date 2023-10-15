

// Define an object to store course coupons
const courseCoupons = {};




// Function to apply a coupon and check if it's valid, applying the discount
function applyCoupon(couponCode, courseId, originalPrice) {
  if (courseCoupons.hasOwnProperty(couponCode)) {
    const coupon = courseCoupons[couponCode];
    if (coupon.courseId === courseId) {
      const currentDate = new Date();
      if (currentDate <= coupon.expires) {
        const discountedPrice = originalPrice * (1 - coupon.discount / 100);
        console.log('Coupon applied successfully! You get a ' + coupon.discount + '% discount. New price: $' + discountedPrice.toFixed(2));
        return discountedPrice;
      } else {
        console.log('Coupon has expired.');
        return originalPrice;
      }
    } else {
      console.log('Coupon is not valid for this course.');
      return originalPrice;
    }
  } else {
    console.log('Invalid coupon code.');
    return originalPrice;
  }
}

// Example usage:

// Create a new coupon for a course with ID 'course123', valid for 30 days, with a 20% discount
const couponCode = createCoupon('course123', 30, 20);

// Apply the coupon to the course with ID 'course123' and original price $100
const courseId = 'course123';
const originalPrice = 100;
const discountedPrice = applyCoupon(couponCode, courseId, originalPrice);

// Provide access to the course or display the discounted price as needed
