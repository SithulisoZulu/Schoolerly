import { AddToCart, CheckIfUserHasCart, CreateCart, GetCarts, GetNumberOfCoursesInCart } from '../../controllers/cart.js';
import { userData } from '../../utils/Session.js';
import { courseId } from './courseDetails.js';
import { loaderBtn } from "../../components/loading.js";

const load =  loaderBtn
const loader = document.getElementById('cartLoader')

const cartFeedback = document.getElementById('cartFeedback')
const user = userData()
const carts =  await GetCarts(user.uid)

document.getElementById('addToCartButton').addEventListener('click', async () => {
  loader.innerHTML = load
  try {
    if (user) {
      const userId = user.uid;

      // Get the user's cart
      const cartSnapshot = await CheckIfUserHasCart(userId);

      if (cartSnapshot.empty) {
        // If the cart is empty, create one and then re-fetch the cart
        const cartId = await CreateCart(userId);
        // Re-fetch the cart
        const newCartSnapshot = await CheckIfUserHasCart(userId);

        // Get the selected course ID (replace 'YOUR_COURSE_ID' with the actual ID)
        const Id = await courseId;;

        // Add the course to the cart
        await AddToCart(userId, Id);

        // Display a success message to the user
        cartFeedback.textContent = 'Course added to the cart!'
        cartFeedback.classList.add("text-success")
        cartFeedback.classList.remove("visually-hidden")
        getNumberOfCoursesInCart(user)
        console.log('Course added to the cart!');
      } else {
        // Get the selected course ID (replace 'YOUR_COURSE_ID' with the actual ID)
        const Id = await courseId;

        // Check if the course is already in the cart
        const cartData = cartSnapshot.docs[0].data();
        const courses = cartData.courses;
        const courseAlreadyInCart = courses.includes(Id);

        if (courseAlreadyInCart) {
            cartFeedback.textContent = 'Course is already in the cart.';
            cartFeedback.classList.add("text-danger")
            cartFeedback.classList.remove("visually-hidden")
            console.log('Course is already in the cart.');
        } else {
          // Add the course to the cart
          await AddToCart(userId, courseId);

          cartFeedback.textContent = 'Course added to the cart!'
          cartFeedback.classList.add("text-success")
          cartFeedback.classList.remove("visually-hidden")
          getNumberOfCoursesInCart(user)
          console.log('Course added to the cart!');
        }
      }
    } else {
      // Handle the case where the user is not authenticated
      console.log('User is not authenticated. Please log in.');
    }
  } catch (error) {
    
  }finally {
    loader.classList.add('visually-hidden');
  }
});

const getNumberOfCoursesInCart = async (user) => {
  const userId = user.uid
  const numberOfCourses = await GetNumberOfCoursesInCart(userId);
  if(numberOfCourses > 0) document.getElementById('cartItemsNo').textContent = numberOfCourses
  document.getElementById('link').setAttribute('id', 'numberOfCourses')
}


//View Instructor Details
document.addEventListener('click', function (e)  {
  if (e.target.classList.contains('goToCart')) {
      var url = `/cart/cartDetails.html?id=${encodeURIComponent(carts.cartId)}`;
      window.location.href = url;
  }
});


getNumberOfCoursesInCart(user)