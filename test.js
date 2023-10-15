import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to save a course comment
async function saveCourseComment(courseId, userId, commentText) {
  const courseRef = doc(db, 'courses', courseId);
  const commentCollection = collection(courseRef, 'comments');

  const newCommentRef = await addDoc(commentCollection, {
    userId: userId,
    text: commentText,
    timestamp: new Date(),
  });

  return newCommentRef.id;
}

// Function to save a comment reply
async function saveCommentReply(courseId, commentId, userId, replyText) {
  const courseRef = doc(db, 'courses', courseId);
  const commentRef = doc(courseRef, 'comments', commentId);
  const replyCollection = collection(commentRef, 'replies');

  await addDoc(replyCollection, {
    userId: userId,
    text: replyText,
    timestamp: new Date(),
  });
}

// Function to call on page load
function onPageLoad() {
  const courseId = 'vK1bgxmCCw4l4D5zkvwJ'; // Replace with the actual course ID
  const userId = 'USER_ID'; // Replace with the actual user ID

  // Save a course comment
  console.log("called from on load")
  saveCourseComment(courseId, userId, 'This is a course comment.')
    .then((commentId) => {
      // Save a comment reply
      saveCommentReply(courseId, commentId, userId, 'This is a reply to the course comment.');


    });
}

// Call onPageLoad when the page loads
window.onload = onPageLoad;
