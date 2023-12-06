import { likeComment, createCourse, updateCourse, addCourseAdditionalInfo, getCourseById, getAllCoursesByUserId, getAllCoursesPendingApproval, getApplicationDetailsByApplicationId, getCourseDocIdByCorseId, rejectCourse, approveCourse, getAllCourses, getCourseLevelById, getAllCourseByInstructorId, getCourseDetailsById, getCourseCategoryById, getAllCourseCategories, getAllCoursesByCategoryId, getAllCourseFAQs, deleteCourse, getAllInstructorMostSellingCourses, postReview, getAllCourseReviews, getReviewReplies, postComment, getAllCourseComments, getCommentReplies, getAllCourseLearnings, postReply } from '../data/database/course.js';
import { checkCurrentUser } from '../libraries/Api/user/userApi.js'
import { courseSubmitted } from '../utils/emails/emails.js';
import { notifications } from '../utils/notifications/notifications.js';
import { route } from '../routers/router.js';

import  userRoles  from '../libraries/roles.js'


/**
 * Creates a new course.
 * 
 * @param {Object} sanitizedData - The sanitized data containing the details of the course to be created.
 * @returns {string} The ID of the newly created course.
 * @throws {Error} If the user is not logged in or does not have the role of an instructor.
 * 
 */
export const CreateCourse = async (sanitizedData) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const currentUser = await checkCurrentUser(user.email);
    
    if (!currentUser || !currentUser.id || currentUser.Role !== userRoles.Instructor) {
        throw new Error("You need an account to create a course");
    }
    
    return await createCourse(sanitizedData, currentUser.id);
}


/**
 * Updates a course in the database.
 * 
 * @param {Object} sanitizedUpdateData - An object containing the sanitized data for updating the course.
 * @returns {Promise<Object>} - The updated course object.
 */
export const UpdateCourse = async(sanitizedUpdateData) => {
    return await updateCourse(sanitizedUpdateData);
}

//Get All Courses By userId
export const GetAllCourseByUserId = async() => {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const user = await checkCurrentUser(User.email)
    if (!user || !user.id){
        throw new Error("You need an account to create a course")
    }
    return await getAllCoursesByUserId(user.id);
}

//Update Additional Info
export const AdditionalInfo = async(sanitizedData, conf) => {
    try {
        if (!sanitizedData || !conf) {
            throw new Error("Invalid input parameters");
        }
        
        const User = JSON.parse(sessionStorage.getItem('user'));
        const user = await checkCurrentUser(User.email)
        if (!user || !user.id){
            throw new Error("You need an account to create a course")
        }
        await addCourseAdditionalInfo(sanitizedData, conf);
        const course = await getCourseById(sanitizedData.id)
        const date = course.creationDate.toDate().toDateString();
        const email = 
        {
            title: course.title,
            status: course.status,
            date: date,
            name: user.Name,
            surname: user.Surname,
            email: user.email,
            message: course.message
        }
        await courseSubmitted(email);
        await notifications(user.id)
        getTimer()
        return course
    } catch (error) {
        console.error("Error in AdditionalInfo:", error);
        throw error;
    }
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
    return await getAllCoursesPendingApproval();
}

//Get All Courses Pending Approval
export const GetApplicationDetailsByApplicationId = async (Id) => {
    return  await getApplicationDetailsByApplicationId(Id);
}

//
export const GetCourseDocIdByCorseId = async (Id) => {
    const docId = await getCourseDocIdByCorseId(Id);
    if (!docId){
        throw new Error("Course docId not Found");
    };
    return docId
}

//Reject Course
export const RejectCourse = async (Id) => {
    if (!Id){
        throw new Error("Id Invalid")
    }
    return await rejectCourse(Id);
}

//Reject Course
export const ApproveCourse = async (Id) => {
    if (!Id){
        throw new Error("Id Invalid")
    }
    return await approveCourse(Id);
}

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

export const GetAllCourseByInstructorId = async (Id) => {
    if (!Id){
        throw new Error("Id Invalid")
    }
    return await getAllCourseByInstructorId(Id);
}

export const GetCourseDetailsById = async (Id) => {
    if(!Id ){
        throw new Error("Id Invalid")
    }
   return await getCourseDetailsById(Id)
}

export const GetCourseCategoryById = async (Id) => {
  return await getCourseCategoryById(Id); 
}

export const GetCourseCategory = async () => {
   return await getAllCourseCategories()
}

export const GetCoursesByCategoryId = async (Id) => {
    if(!Id)
    {
        throw new Error("Invalid Id parameter");
    }
    return await getAllCoursesByCategoryId(Id);
}

export const GetAllCourseFAQs = async (Id) => {
    if(!Id)
    {
        throw new Error("Invalid Id Parameter")
    }
    return await getAllCourseFAQs(Id);
}

export const DeleteCourse = async (Id) => {
    if(!Id)
    {
        throw new Error("Invalid Id parameter");
    }
    const docId = await getCourseDocIdByCorseId(Id)
    await deleteCourse(docId)
    return;
}

export const GetAllInstructorMostSellingCourses = async () => {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const user = await checkCurrentUser(User.email)
    if (!user || !user.id){
        throw new Error("You need an account to create a course")
    }
    return await getAllInstructorMostSellingCourses(user.id);
}

export const  PostReview =  async (review) => {
    if(!review)
    {
        console.log('Controller: ${Can not post an empty review}')
        return { success: false, message: "Can not post an empty review : Course Controller" };
    }
    return await postReview(review)
}

export const GetAllCourseReviews =  async (Id) => {
    if(!Id)
    {
        console.log('Controller: {Can not get reviews, no Id was provided}');
        return { success: false, message: "Can not get reviews, no Id was provided : Course Controller" };
    }; 
    return await getAllCourseReviews(Id);
}

export const GetReviewReplies = async (Id) => {
    if(!Id)
    {
        console.log('Controller: {Can not get replies, no Id was provided}');
        return { success: false, message: "Can not get replies, no Id was provided : Course Controller" };
    };  
    return await getReviewReplies(Id);
}

export const PostComment = async (comment) => 
{
    if(!comment)
    {
        console.log('Controller: ${Can not post an empty comment}')
        return { success: false, message: "Can not post an empty comment : Course Controller" };
    }
    return await postComment(comment) 
}

export const GetAllCourseComments = async (Id) => {
    if(!Id)
    {
        console.log('Controller: {Can not get comments, no Id was provided}');
        return { success: false, message: "Can not get comments, no Id was provided : Course Controller" };
    };
    return await getAllCourseComments(Id);
}

export const GetCommentReplies = async (Id) =>
{
    if(!Id)
    {
        console.log('Controller: {Can not get comment replies, no Id was provided}');
        return { success: false, message: "Can not get comments replies, no Id was provided : Course Controller" };
    };
    return await getCommentReplies(Id)
}

export const GetAllCourseLearnings =  async (Id) => {
    if(!Id)
    {
        console.log('Controller: {Can not get learnings, no Id was provided}');
        return { success: false, message: "Can not get learnings, no Id was provided : Course Controller" };
    }; 
    return await getAllCourseLearnings(Id);
}

export const PostReply = async (reply) => 
{
    if(!reply)
    {
        console.log('Controller: ${Can not post an empty comment}')
        return { success: false, message: "Can not post an empty comment : Course Controller" };
    }
    return await postReply(reply) 
}

export const LikeComment = async (Id, user) => {          
    if(!Id || !user)  throw new Error ('Can not add to cart missing some information');
    return await likeComment(Id, user);
}
