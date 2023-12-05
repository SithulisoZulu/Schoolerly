import { collection, addDoc, Timestamp, updateDoc, doc, query, getDocs, where, limit, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL  as db } from '../../libraries/firebaseApi.js'
import courseStatues from '../../libraries/courseStatuses.js';

/**
 * Adds a new course to a Firestore database collection.
 * @param {Object} sanitizedData - An object containing the sanitized data for the new course.
 * @param {string} id - The ID of the user creating the course.
 * @returns {Promise<Object>} - A promise that resolves with an object containing the generated course ID (`id`) and the document ID of the added course (`doc`).
 */
export const createCourse = async (sanitizedData, id) => {

  const courseId = crypto.randomUUID();
  return addDoc(collection(db, "courses"), {
    title           : sanitizedData.title,
    shortDescription: sanitizedData.shortDescription,
    level           : sanitizedData.level,
    categoryId      : sanitizedData.Category,
    status          : courseStatues.Pending,
    courseId        : courseId,
    creationDate    : Timestamp.fromDate(new Date()),
    language        : sanitizedData.language,
    time            : sanitizedData.time,
    enableDiscount  : sanitizedData.enableDiscount,
    userId          : id,
    discount        : sanitizedData.DiscountPrice,
    longDescription : sanitizedData.longDescription,
    price           : sanitizedData.price,
    enrolled        : 0,
    updatedAt       : Timestamp.fromDate(new Date()),
    studentId       : [],
    likes           : []
  }).then((docRef) => {
    const course = {
      id : courseId,
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
        return await courseData[0];   
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
            photo   : sanitizedUpdateData.photo,
            video   : sanitizedUpdateData.video,
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
            message     : sanitizedData.message,
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
       return await  querySnapshot.docs.map(doc => doc.data());
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
        return await querySnapshot.docs.map(doc => doc.data());
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
        return await querySnapshot.docs.map(doc => doc.data());
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
        return await  querySnapshot.docs.map(doc => doc.data());
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
        return await  notifications.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
};

//Get Course Doc Id By Email
export async function getCourseDocIdByCorseId(Id) {
    if (Id === null || Id === undefined) {
        throw new Error("Invalid Id");
    }
    const userQuery = query(collection(db, "courses"), where("courseId", "==", Id), limit(1));
    try {
        const user = await getDocs(userQuery);
        const userDoc = user.docs.map(doc => doc.id);
       return await  userDoc[0];
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
        return await  levelData[0];   
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
        return await  querySnapshot.docs.map(doc => doc.data());
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
        return await  querySnapshot.docs.map(doc => doc.data());
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
        return await categoryData[0];   
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
}

export const getAllCourseCategories = async () => {
    try {
        const Query = query(collection(db, "categories"), where("name", "!=", "Select Course Category"));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
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
        return await querySnapshot.docs.map(doc => doc.data());
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
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting faqs by courseID:", error);
        throw error;
    } 
}

export const getAllCourseLevels = async () => {
    try {
        const Query = query(collection(db, "levels"), where("id", "!=", "1"));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting All levels:", error);
        throw error;
    };
}

export const postReview = async (review) => {

    return addDoc(collection(db, "reviews"), {
        id      : crypto.randomUUID(),
        courseId: review.courseId,
        name    : review.name,
        email   : review.email,
        rating  : review.rating,
        review  : review.review,
        userId  : review.userId,
        postedAt: Timestamp.fromDate(new Date()),
        likes: [],
        dislikes: []
    }).then((docRef) => {
        return review;
    });
}

export const getAllCourseReviews = async (Id) => {
    try {
        const Query = query(collection(db, "reviews"), where("courseId", "==", Id));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting All reviews:", error);
        throw error;
    };
}

export const getReviewReplies = async (Id) => {
    try {
        const Query = query(collection(db, "reviewReplies"), where("reviewId", "==", Id));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting All replies:", error);
        throw error;
    };
}

/**
 * Adds a new comment to a Firestore collection.
 * @param {Object} comment - The comment object to be added.
 * @param {string} comment.courseId - The ID of the course the comment is related to.
 * @param {string} comment.comment - The content of the comment.
 * @param {string} comment.userId - The ID of the user who posted the comment.
 * @returns {Promise<Object>} - A promise that resolves to the comment object after it has been added to the collection.
 */
export const postComment = async (comment) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      id      : crypto.randomUUID(),
      courseId: comment.courseId,
      comment : comment.comment,
      userId  : comment.userId,
      postedAt: Timestamp.fromDate(new Date()),
      likes   : []
    });
    return comment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

export const getAllCourseComments = async (Id) => {
    try {
        const Query = query(collection(db, "comments"), where("courseId", "==", Id));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting All replies:", error);
        throw error;
    };
}

export const getCommentReplies = async (Id) => {
    try {
        const Query = query(collection(db, "commentReplies"), where("commentId", "==", Id));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting All replies:", error);
        throw error;
    };
}

export const getAllCoursesByLevelId = async (Id) => {
    try {
        if (!Id) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "courses"), where("level", "==", Id));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    } 
}

export const getAllCourseLearnings = async (Id) => {
    try {
        const Query = query(collection(db, "courseLearnings"), where("courseId", "==", Id));
        const querySnapshot = await getDocs(Query);
        return await querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting All learnings:", error);
        throw error;
    };
}

export const postReply = async (reply) => {
    try {
      const docRef = await addDoc(collection(db, "commentReplies"), {
        id      : crypto.randomUUID(),
        commentId : reply.commentId,
        userId  : reply.userId,
        repliedAt: Timestamp.fromDate(new Date()),
        reply: reply.reply,
        likes: []
      });
      return reply;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
}

export const likeComment = async (id, user) =>  {
    const commentQuery    = query(collection(db, 'comments'), where('id', '==', id));
    const commentSnapshot = await getDocs(commentQuery);
  
    commentSnapshot.forEach(async (commentDoc) => {
      const commentData = commentDoc.data();
      const likes  = commentData.likes;
      likes.push(user);
      await updateDoc(doc(db, 'comments', commentDoc.id), { likes: likes });
    });
  }