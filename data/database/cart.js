import { deleteDoc, doc,addDoc, updateDoc, query, getDocs, collection, limit, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "../../libraries/firebaseApi.js";

// Function to create a cart for a user
export const createCart = async (userId) => {
  try {
    const cartDocRef = await addDoc(collection(db, 'carts'), {
      userId: userId,
      courses: []
    });
    
    const cartId = cartDocRef.id;

    // Update the cart document to store the cart ID
    await updateDoc(doc(db, 'carts', cartId), {
      cartId: cartId
    });

    return cartId;
  } catch (error) {
    console.error('Error creating a cart: ', error);
    return null; // Return null in case of an error
  }
}

export const checkIfUserHasCart = async (userId) => {
  // Check if the user has a cart, and if not, create one
  const cartQuery    = query(collection(db, 'carts'), where('userId', '==', userId));
  const cartSnapshot = await getDocs(cartQuery);
  return cartSnapshot;
}

export const addToCart = async (userId, courseId) =>  {
  const cartQuery    = query(collection(db, 'carts'), where('userId', '==', userId));
  const cartSnapshot = await getDocs(cartQuery);

  cartSnapshot.forEach(async (cartDoc) => {
    const cartData = cartDoc.data();
    const courses  = cartData.courses;
    courses.push(courseId);
    await updateDoc(doc(db, 'carts', cartDoc.id), { courses: courses });
  });
}

// Function to get the number of courses in the user's cart
export const getNumberOfCoursesInCart = async (userId) => {
  try {
    const cartQuery    = query(collection(db, 'carts'), where('userId', '==', userId));
    const cartSnapshot = await getDocs(cartQuery);

    if (cartSnapshot.empty) {
      return 0; // Cart is empty
    } else {
      const cartData = cartSnapshot.docs[0].data();
      const courses  = cartData.courses;
      return courses.length;
    }
  } catch (error) {
    console.error('Error getting number of courses in cart: ', error);
    return -1; // An error occurred
  }
}
  
export const getCarts = async (userId) => {
  try {
    const cartQuery    = query(collection(db, 'carts'), where('userId', '==', userId));
    const cartSnapshot = await getDocs(cartQuery);

    if (cartSnapshot.empty) {
      return 0; // Cart is empty
    } else {
      const cartData = cartSnapshot.docs[0].data();
      return cartData;
    }
  } catch (error) {
    console.error('Error getting number of courses in cart: ', error);
    return -1; // An error occurred
  }
}

export const getCartDetails = async(Id) => {
  try {
    const Query = query(collection(db, "carts"), where("cartId", "==", Id));
    const querySnapshot = await getDocs(Query);
    return await querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error getting All reviews:", error);
    throw error;
  };
}