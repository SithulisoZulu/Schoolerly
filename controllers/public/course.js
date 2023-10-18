import { getAllCourses, getCourseLevelById } from "../../data/database/public/course.js";

export const GetAllCourses = async () => {
    const allCourses = await getAllCourses();
    if (!allCourses){
        throw new Error("No Course Found");
    };
    return allCourses;
}

export const GetCourseLevelById = async (Id) => {
    const level = await getCourseLevelById(Id);
    return level 
}