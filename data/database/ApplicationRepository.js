import { deleteDoc, doc, updateDoc, query, getDocs, collection, limit, where, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from '../../libraries/firebaseApi.js';
import applicationStatuses from '../../libraries/applicationStatuses.js';
export const getStudentApplication = async (Email) => {
  if (Email === null || Email === undefined) {
    throw new Error("Invalid userEmail");
  }
  const userQuery = query(collection(db, "studentApplications"), where("studentEmail", "==", Email), limit(1));
  try {
    const querySnapshot = await getDocs(userQuery);
    const applicationData = querySnapshot.docs.map(doc => doc.data());
    return await applicationData[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
export const getStudentApplicationByStudentId = async (Id) => {
  if (Id === null || Id === undefined) {
    throw new Error("Invalid userEmail");
  }
  const userQuery = query(collection(db, "studentApplications"), where("id", "==", Id), limit(1));
  try {
    const querySnapshot = await getDocs(userQuery);
    const applicationData = querySnapshot.docs.map(doc => doc.data());
    return await applicationData[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export const getStudentEmergenceContactInfoByStudentId = async (Id) => {
  if (Id === null || Id === undefined) {
    throw new Error("Invalid userEmail");
  }
  const userQuery = query(collection(db, "studentEmergencyContact"), where("studentId", "==", Id), limit(1));
  try {
    const querySnapshot = await getDocs(userQuery);
    const applicationData = querySnapshot.docs.map(doc => doc.data());
    return await applicationData[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export const getApplicationDetailsById = async (Id) => {
  if (Id === null || Id === undefined) {
      throw new Error("Invalid userEmail");
  }
  const userQuery = query(collection(db, "studentApplications"), where("id", "==", Id), limit(1));
  try {
    const querySnapshot = await getDocs(userQuery);
    const applicationData = querySnapshot.docs.map(doc => doc.data());
    return await applicationData[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export const createStudentApplication =  async (studentInformation, emergenceContactInformation, educationInformation) => {
   
  const studentId = crypto.randomUUID();
  const Id = crypto.randomUUID();
  return addDoc(collection(db, "studentApplications"), {
    id                         : Id,
    studentFirstName           : studentInformation.studentFirstName,
    studentMiddleName          : studentInformation.studentMiddleName,
    studentLastName            : studentInformation.studentLastName,
    gender                     : studentInformation.gender,
    dateOfBirth                : studentInformation.dateOfBirth,
    studentEmail               : studentInformation.studentEmail,
    studentPhoneNumber         : studentInformation.studentPhoneNumber,
    studentAddress             : studentInformation.studentAddress,
    city                       : studentInformation.city,
    state                      : studentInformation.state,
    zipCode                    : studentInformation.zipCode,
    country                    : studentInformation.country,
    status                     : applicationStatuses.Pending,
    submittedDate              : Timestamp.fromDate(new Date()),
    rejectedDate               : Timestamp.fromDate(new Date()),
    approvedDate               : Timestamp.fromDate(new Date()),
    approvedByFirstApproverDate: Timestamp.fromDate(new Date()),
    studentId                  : studentId
  }).then(async (docRef) => {
    const studentEmergenceContact = await createEmergenceContact(emergenceContactInformation, studentId);
    const studentEducation = await createStudentEducation(educationInformation, studentId)
    const Application = {
      studentInfo                : studentInformation,
      studentEmergenceContactInfo: studentEmergenceContact,
      studentEducationInfo       : studentEducation,
      studentId                  : studentId,
      docRef                     : docRef.id,
      applicationId              : Id
    };
    return Application;
  }); 
}

export const createEmergenceContact =  async (emergenceContactInformation, studId) => {
   
  const emergencyContactId = crypto.randomUUID();
  return addDoc(collection(db, "studentEmergencyContact"), {
    id                          : emergencyContactId,
    emergencyContactSalutation  : emergenceContactInformation.emergencyContactSalutation,
    emergencyContactFullName    : emergenceContactInformation.emergencyContactFullName,
    emergencyContactRelation    : emergenceContactInformation.emergencyContactRelation,
    emergencyContactEmail       : emergenceContactInformation.emergencyContactEmail,
    emergencyContactPhoneNumber : emergenceContactInformation.emergencyContactPhoneNumber,
    emergencyContactHomeAddress : emergenceContactInformation.emergencyContactHomeAddress,
    emergencyContactJobTitle    : emergenceContactInformation.emergencyContactJobTitle,
    emergencyContactOfficeNumber: emergenceContactInformation.emergencyContactOfficeNumber,
    studentId: studId,
  }).then((docRef) => {
    const emergencyContact = {
      id : emergencyContactId,
      doc: docRef.id,
    };
    return emergencyContact;
  }); 
}

export const createStudentEducation =  async (educationInformation, studId) => {
   
  const educationId = crypto.randomUUID();
  return addDoc(collection(db, "studentEducation"), {
    id                    : educationId,
    schoolName            : educationInformation.schoolName,
    yearOfPassing         : educationInformation.yearOfPassing,
    board                 : educationInformation.board,
    grad                  : educationInformation.grad,
    schoolOrCollegeAddress: educationInformation.schoolOrCollegeAddress,
    studentId             : studId,
  }).then((docRef) => {
    const education = {
      id : educationId,
      doc: docRef.id,
    };
    return education;
  }); 
}


export const getAllStudentApplicationsPendingApproval = async () => {
  const userQuery = query(collection(db, "studentApplications"), where("status", "==", applicationStatuses.Pending));
  try {
    const querySnapshot = await getDocs(userQuery);
    return await  querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

//Get Course Doc Id By Email
export async function getApplicationDocIdByCorseId(Id) {
  if (Id === null || Id === undefined) {
    throw new Error("Invalid Id");
  }
  const userQuery = query(collection(db, "studentApplications"), where("id", "==", Id), limit(1));
  try {
    const Application = await getDocs(userQuery);
    const ApplicationDoc = Application.docs.map(doc => doc.id);
    return await  ApplicationDoc[0];
  } catch (error) {
    console.error("Error fetching application docId:", error);
    throw error;
  }
}

export const approvedStudentApplication= async (Id) => {
  // update the status of application to approved
  const updateRef = await doc(db, "studentApplications", Id);

  try {
    await updateDoc(updateRef, {
      status      : applicationStatuses.Approved,
      approvedDate: Timestamp.fromDate(new Date()),
    });

    return;

  } catch (error) {
    throw error.message + "" + error.code;
  }
}
export const rejectStudentApplication= async (Id) => {
  // update the status of application to approved
  const updateRef = await doc(db, "studentApplications", Id);

  try {
    await updateDoc(updateRef, {
      status      : applicationStatuses.Rejected,
      rejectedDate: Timestamp.fromDate(new Date()),
    });

    return;

  } catch (error) {
    throw error.message + "" + error.code;
  }
}