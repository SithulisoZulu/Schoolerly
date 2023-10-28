import { collection, addDoc, Timestamp, updateDoc, doc, query, getDocs, where, limit, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL  as db, app } from '../../libraries/firebaseApi.js'
import courseStatues from '../../libraries/courseStatuses.js';

//Add Course
export const createCourse = async (sanitizedData, id) => {

  const courseId = crypto.randomUUID();
  return addDoc(collection(db, "courses"), {
    title: sanitizedData.title,
    shortDescription: sanitizedData.shortDescription,
    level: sanitizedData.level,
    categoryId: sanitizedData.Category,
    status: courseStatues.Pending,
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

//Get all Most Selling Courses By UserId
export const getAllInstructorMostSellingCourses = async (Id) => {
    if(!Id) {throw new Error("Invalid Id Parameter")}
    try{
        const Query = query(collection(db, "courses"), where("userId", "==", Id), limit(5)); 
        const querySnapshot = await getDocs(Query);
        return querySnapshot.docs.map(doc => doc.data());
    }
    catch (error) {
        console.log ("Error Getting Instructor Most Selling Courses : ", error);
    }
}

//Get All Courses Pending Approval
export const getAllCoursesPendingApproval = async () => {
    try {
        const Query = query(collection(db, "courses"), where("status", "==", courseStatues.Pending));
        const querySnapshot = await getDocs(Query);
        const courses = querySnapshot.docs.map(doc => doc.data());
        return courses
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
}

//Get All Application Details By Application Id
export const getApplicationDetailsByApplicationId = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "courses"), where("courseId", "==", Id));
        const notifications = await getDocs(Query);
        const notificationData = notifications.docs.map(doc => doc.data());
        return notificationData;
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
};


//Get User Doc Id By Email
export async function getCourseDocIdByCorseId(Id) {
    if (Id === null || Id === undefined) {
        throw new Error("Invalid Id");
    }
    const userQuery = query(collection(db, "courses"), where("courseId", "==", Id), limit(1));
    try {
        const user = await getDocs(userQuery);
        const userDoc = user.docs.map(doc => doc.id);
        const docId = userDoc[0];
        return docId;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export const rejectCourse = async (Id) => {
    const updateRef = await doc(db, "courses", Id);

    try {
      await updateDoc(updateRef, {
        status   : courseStatues.Rejected,
      });
  
      return;
  
    } catch (error) {
      throw error.message + "" + error.code;
    }
}
export const approveCourse = async (Id) => {
    const updateRef = await doc(db, "courses", Id);

    try {
      await updateDoc(updateRef, {
        status   : courseStatues.Live,
      });
  
      return;
  
    } catch (error) {
      throw error.message + "" + error.code;
    }
}

export const getCourseLevelById = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "levels"), where("id", "==", Id));
        const querySnapshot = await getDocs(Query);
        const levelData = querySnapshot.docs.map(doc => doc.data());
        const level = levelData[0];   
        return level
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
}

export const getAllCourseByInstructorId = async (Id) => {
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
}

export const getCourseDetailsById = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "courses"), where("courseId", "==", Id));
        const querySnapshot = await getDocs(Query);
        const courses = querySnapshot.docs.map(doc => doc.data());
        return courses
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }  
}


export const getCourseCategoryById = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "categories"), where("id", "==", Id));
        const querySnapshot = await getDocs(Query);
        const categoryData = querySnapshot.docs.map(doc => doc.data());
        const category = categoryData[0];   
        return category
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
}

export const getAllCourseCategories = async () => {
    try {
        const Query = query(collection(db, "categories"), where("name", "!=", "Select Course Category"));
        const querySnapshot = await getDocs(Query);
        const categories = querySnapshot.docs.map(doc => doc.data());
        return categories
    } catch (error) {
        console.error("Error getting categories:", error);
        throw error;
    }
}

export const getAllCoursesByCategoryId = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "courses"), where("categoryId", "==", Id));
        const querySnapshot = await getDocs(Query);
        const courses = querySnapshot.docs.map(doc => doc.data());
        return courses
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    } 
}

export const getAllCourseFAQs = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "topics"), where("courseId", "==", Id));
        const querySnapshot = await getDocs(Query);
        const faqs = querySnapshot.docs.map(doc => doc.data());
        return faqs
    } catch (error) {
        console.error("Error getting faqs by courseID:", error);
        throw error;
    } 
}