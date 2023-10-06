import { collection, addDoc, Timestamp, updateDoc, doc, query, getDocs, where, limit, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL  as db, app } from '../../libraries/firebaseApi.js'
import { user } from '../../utils/Session.js'
import { checkCurrentUser } from '../../libraries/Api/user/userApi.js'
import courseStatues from '../../libraries/courseStatuses.js';

//Add Topic
export const createTopic = async (sanitizedData) => {

    const topicId = crypto.randomUUID();
    return addDoc(collection(db, "topics"), {
      question: sanitizedData.question,
      answer: sanitizedData.answer,
      createdAt: Timestamp.fromDate(new Date()),
      topicId : topicId ,
      courseId: sanitizedData.id
    }).then((docRef) => {
      const topic = {
        id: sanitizedData.id,
        doc: docRef.id,
      };
      return topic;
    });
};

//get topics by courseId
export const getTopicsByCourseId = async (courseId) => {
    try {
        if (!courseId) {
            throw new Error("Invalid Id parameter");
        }
        const Query = query(collection(db, "topics"), where("courseId", "==", courseId));
        const querySnapshot = await getDocs(Query);
        const topics = querySnapshot.docs.map(doc => doc.data());
        return topics
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
}