import { addToCart, checkIfUserHasCart, createCart, getCartDetails, getCarts, getNumberOfCoursesInCart } from "../data/database/cart.js"

// Function to create a cart for a user
export const CreateCart = async (userId) => {
    if(!userId)
    {
        throw new Error('Cannot create cart no user id')
    }
    return await createCart(userId)
}
 
export const CheckIfUserHasCart = async (userId) => {   
    if(!userId)
    {
        throw new Error ('Can not get cart no user id')
    }
    return await checkIfUserHasCart(userId)
}

export const AddToCart = async (userId, courseId) => {
    if(!userId || !courseId)  throw new Error ('Can not add to cart missing some information');
    return await addToCart(userId, courseId);
}

export const GetNumberOfCoursesInCart = async (userId) => {
    // if(!userId) throw new Error('No User Found, Cannot get cart')
    return await getNumberOfCoursesInCart(userId)
}

export const GetCarts = async (userId) => {
    // if(!userId) throw new Error('No User Found, Cannot get cart')
    return await getCarts(userId)
}

export const GetCartDetails = async (Id) => {
    if(!Id)
    {
        console.log('Controller: {Can not get cart, no Id was provided}');
        return { success: false, message: "Can not get cart, no Id was provided : Course Controller" };
    }; 
    return await getCartDetails(Id);
}