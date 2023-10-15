import { getAllInstructors } from "../data/database/instructor.js";
import { user } from "../utils/Session.js";

// //? Get User email
const email = user();
export const GetAllInstructors = async () => {
    const allInstructors =  await getAllInstructors();
    return allInstructors;
}