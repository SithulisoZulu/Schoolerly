import { getAllInstructors, getInstructorByEmail } from "../data/database/instructor.js";
import { user } from "../utils/Session.js";

// //? Get User email
const email = user();
export const GetAllInstructors = async () => {
   return  await getAllInstructors();
}

export const GetInstructorByEmail = async(email) => {
    if(!email)
    {
        throw new Error("Invalid email Parameter")
    };
    return await getInstructorByEmail(email);
}