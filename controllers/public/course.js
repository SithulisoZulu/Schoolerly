import { getAllCourseLevels, getAllCoursesByCategoryId, getAllCoursesByLevelId } from "../../data/database/course.js";
import { getAllCourses, getCourseLevelById } from "../../data/database/public/course.js";

export const GetAllCourses = async () => {
    const allCourses = await getAllCourses();
    if (!allCourses){
        throw new Error("No Course Found");
    };
    return allCourses;
}

export const GetCourseLevelById = async (Id) => {
    return await getCourseLevelById(Id);
}

export const GetCoursesByCategoryId = async (Id) => {
    if(!Id)
    {
        throw new Error("Invalid Id Parameter");
    }
    return await getAllCoursesByCategoryId(Id);
}
export const GetCoursesByLevelId = async (Id) => {
    if(!Id)
    {
        throw new Error("Invalid Id Parameter");
    }
    return await getAllCoursesByLevelId(Id);
}

export const GetAllCourseLevels = async () => {
    return await  getAllCourseLevels();
}