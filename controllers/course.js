import { createCourse, updateCourse, addCourseAdditionalInfo, getCourseById, getAllCoursesByUserId, getAllCoursesPendingApproval, getApplicationDetailsByApplicationId, getCourseDocIdByCorseId, rejectCourse, approveCourse, getAllCourses, getCourseLevelById } from '../data/database/course.js';
import { checkCurrentUser } from '../libraries/Api/user/userApi.js'
import { user } from '../utils/Session.js'
import { courseSubmitted } from '../utils/emails/emails.js';
import { notifications } from '../utils/notifications/notifications.js';
import { route } from '../routers/router.js';

import  userRoles  from '../libraries/roles.js'

const email = user();

// Create Course
export const CreateCourse = async (sanitizedData) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Instructor){
        throw new Error("You need an account to create a course")
    }
    const course = await createCourse(sanitizedData, user.id);
    return course
}

//Update Course
export const UpdateCourse = async(sanitizedUpdateData) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Instructor){
        throw new Error("You need an account to create a course")
    }
    const course = await updateCourse(sanitizedUpdateData);
    return course
}

//Get All Courses By userId
export const GetAllCourseByUserId = async() => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Instructor){
        throw new Error("You need an account to create a course")
    }
    const course = await getAllCoursesByUserId(user.id);
    return course
}

//Update Additional Info
export const AdditionalInfo = async(sanitizedData, conf) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Instructor){
        throw new Error("You need an account to create a course")
    }
    await addCourseAdditionalInfo(sanitizedData, conf);
    const course = await getCourseById(sanitizedData.id)
    const date = course.creationDate.toDate().toDateString();
    const details = 
    {
        title: course.title,
        status: course.status,
        date: date,
        name: user.Name,
        surname: user.Surname,
        email: user.email,
        message: course.message
    }
    await courseSubmitted(details);
    await notifications(user.id)
    getTimer()
    return course
}
function getTimer()
{
    var timer = setInterval(() => {  
        try {
            var url = `${route.courseAdded}`;
            window.location.replace(url);
          } 
          catch (error) {
            console.log(error);
            throw error
          }
    }, 2000);
}

//Get All Courses Pending Approval
export const GetAllCoursesPendingApproval = async () => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Admin){
        throw new Error("You need an account to create a course")
    }
    const courses = await getAllCoursesPendingApproval();
    return courses
}

//Get All Courses Pending Approval
export const GetApplicationDetailsByApplicationId = async (Id) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Admin){
        throw new Error("You need an account to create a course")
    }
    const courses = await getApplicationDetailsByApplicationId(Id);
    return courses
}
export const GetCourseDocIdByCorseId = async (Id) => {
    const docId = await getCourseDocIdByCorseId(Id);
    if (!docId){
        throw new Error("Course Found");
    };
    return docId
}

//Reject Course
export const RejectCourse = async (Id) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Admin){
        throw new Error("You Don't Have the permission to perform that action")
    }
    const courses = await rejectCourse(Id);
    return courses
}

//Reject Course
export const ApproveCourse = async (Id) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Admin){
        throw new Error("You Don't Have the permission to perform that action")
    }
    const courses = await approveCourse(Id);
    return courses
}

export const GetAllCourses = async () => {
    const allCourses = await getAllCourses();
    if (!allCourses){
        throw new Error("No Course Found");
    };
    return allCourses;
}

export const GetCourseLevelById = async (Id) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id || user.Role !== userRoles.Admin){
        throw new Error("You need an account to create a course")
    }
    const level = await getCourseLevelById(Id);
    return level 
}