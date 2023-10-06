import { collection, addDoc, Timestamp, updateDoc, doc, query, getDocs, where, limit, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL  as db, app } from '../../libraries/firebaseApi.js'
import { user } from '../../utils/Session.js'
import { checkCurrentUser } from '../../libraries/Api/user/userApi.js'
import courseStatues from '../../libraries/courseStatuses.js';

const email = user();

//Add Course
export const createCourse = async (sanitizedData, id) => {

  const courseId = crypto.randomUUID();
  return addDoc(collection(db, "courses"), {
    title: sanitizedData.title,
    shortDescription: sanitizedData.shortDescription,
    level: sanitizedData.level,
    categoryId: sanitizedData.Category,
    status: courseStatues.Applied,
    courseId: courseId,
    creationDate: Timestamp.fromDate(new Date()),
    language: sanitizedData.language,
    time: sanitizedData.time,
    featureCourse: sanitizedData.featureCourse,
    enableDiscount: sanitizedData.enableDiscount,
    userId: id,
    discount: sanitizedData.DiscountPrice,
    longDescription: sanitizedData.longDescription,
    price: sanitizedData.price,
    enrolled: 0,
  }).then((docRef) => {
    const course = {
      id: courseId,
      doc: docRef.id,
    };
    return course;
  });
};

//Get a single Course
export const getCourseById = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "courses"), where("courseId", "==", Id), limit(1));
        const querySnapshot = await getDocs(Query);
        const courseData = querySnapshot.docs.map(doc => doc.data());
        const course = courseData[0];   
        return course
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
}

//update a Course
export const updateCourse = async (sanitizedUpdateData) => {
    try {
        const updateRef = doc(db, "courses", sanitizedUpdateData.docId);

        await updateDoc(updateRef, {
            photo: sanitizedUpdateData.photo,
            video: sanitizedUpdateData.video,
            fileName: sanitizedUpdateData.fileName,
            videoUrl: sanitizedUpdateData.videoUrl,
        });
        return true;

    } catch (error) {
        console.error("Error updating course:", error);
        return false;
    }
};

//delete a course
export const deleteCourse  = async (id) => {
    try {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error('Invalid ID');
        }
        const docRef = await deleteDoc(doc(db, "courses", id));
        return { success: true, message: "Course deleted successfully", course: docRef };
    } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
    }
};

//update a Course
export const addCourseAdditionalInfo = async (sanitizedData, conf) => {
    try {
        const updateRef = doc(db, "courses", sanitizedData.docId);

        await updateDoc(updateRef, {
            message: sanitizedData.message,
            confirmation: conf
        });
        return true;

    } catch (error) {
        console.error("Error updating course:", error);
        return false;
    }
};

//Get all courses
export const getAllCourses = async () => {
    try {
        const Query = query(collection(db, "courses"));
        const querySnapshot = await getDocs(Query);
        const allCourses = querySnapshot.docs.map(doc => doc.data());
        return allCourses;
    } catch (error) {
        console.error("Error getting All course:", error);
        throw error;
    };
}

//Get All Courses By UserId
export const getAllCoursesByUserId = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "courses"), where("userId", "==", Id));
        const querySnapshot = await getDocs(Query);
        const courses = querySnapshot.docs.map(doc => doc.data());
        return courses
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
};