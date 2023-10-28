import { createCourse, updateCourse, addCourseAdditionalInfo, getCourseById, getAllCoursesByUserId, getAllCoursesPendingApproval, getApplicationDetailsByApplicationId, getCourseDocIdByCorseId, rejectCourse, approveCourse, getAllCourses, getCourseLevelById, getAllCourseByInstructorId, getCourseDetailsById, getCourseCategoryById, getAllCourseCategories, getAllCoursesByCategoryId, getAllCourseFAQs } from '../../../data/database/course.js';
import { checkCurrentUser } from '../../../libraries/Api/user/userApi.js'
import { courseSubmitted } from '../../../utils/emails/emails.js';
import { notifications } from '../../../utils/notifications/notifications.js';
import { route } from '../../../routers/router.js';
import  userRoles  from '../../../libraries/roles.js'

// Create Course
export const CreateCourse = async (sanitizedData) => {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const user = await checkCurrentUser(User.email)
    if (!user || !user.id || user.Role !== userRoles.Instructor){
        throw new Error("You need an account to create a course")
    }
    const course = await createCourse(sanitizedData, user.id);
    return course
}

//Update Course
export const UpdateCourse = async(sanitizedUpdateData) => {
    const course = await updateCourse(sanitizedUpdateData);
    return course
}

//Get All Courses By userId
export const GetAllCourseByUserId = async() => {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const user = await checkCurrentUser(User.email)
    if (!user || !user.id || user.Role){
        throw new Error("You need an account to create a course")
    }
    const course = await getAllCoursesByUserId(user.id);
    return course
}

//Update Additional Info
export const AdditionalInfo = async(sanitizedData, conf) => {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const user = await checkCurrentUser(User.email)
    if (!user || !user.id){
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
    const courses = await getAllCoursesPendingApproval();
    return courses
}

//Get All Courses Pending Approval
export const GetApplicationDetailsByApplicationId = async (Id) => {
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
    const courses = await rejectCourse(Id);
    return courses
}

//Reject Course
export const ApproveCourse = async (Id) => {
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
    const level = await getCourseLevelById(Id);
    return level 
}

export const GetAllCourseByInstructorId = async (Id) => {
    if (!Id){
        throw new Error("Id Invalid")
    }
    const courses = await getAllCourseByInstructorId(Id);
    return courses 
}

export const GetCourseDetailsById = async (Id) => {
    if(!Id ){
        throw new Error("Id Invalid")
    }
    const course = await getCourseDetailsById(Id)
    return course
}

export const GetCourseCategoryById = async (Id) => {
    const category = await getCourseCategoryById(Id);
    return category 
}

export const GetCourseCategory = async () => {
    const categories = await getAllCourseCategories()
    return categories;
}

export const GetCoursesByCategoryId = async (Id) => {
    if(!Id)
    {
        throw new Error("Invalid Id paremeter");
    }
    const courses =  await getAllCoursesByCategoryId(Id);
    return courses;
}

export const GetAllCourseFAQs = async (Id) => {
    if(!Id)
    {
        throw new Error("Invalid Id Parameter")
    }
    const faqs = await getAllCourseFAQs(Id);
    return faqs;
}