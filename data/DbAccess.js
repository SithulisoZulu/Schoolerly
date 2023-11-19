export const DbAccess  = {
    //update course reference
    courseUpdate: 'doc(db, "courses", sanitizedUpdateData.docId);',
    //GET single Course
    getCourse: 'query(collection(db, "courses"), where("courseId", "==", Id), limit(1));',
}