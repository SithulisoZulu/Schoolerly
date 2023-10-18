import { getAllInstructors, getInstructorByEmail } from "../data/database/instructor.js";
import { user } from "../utils/Session.js";

// //? Get User email
const email = user();
export const GetAllInstructors = async () => {
    const allInstructors =  await getAllInstructors();
    return allInstructors;
}

export const GetInstructorByEmail = async(email) => {
    console.log(email)
    if(!email)
    {
        throw new Error("Invalid email Parameter")
    };
    const instructor = await getInstructorByEmail(email);
    return instructor;
}