// Function to generate a random coupon code
export function generateCouponCode() {
    const characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    const codeLength = 20;
    let couponCode = '';
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters[randomIndex];
    }
    return couponCode;
  }