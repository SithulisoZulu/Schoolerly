import { CreateStudentApplication, GetStudentApplication } from "../../../controllers/applicationController.js";
import { ErrorMessage } from "../../../libraries/errors/messages.js";
import { loaderBtn } from "../../../components/loading.js";
import { getUserDataByEmail } from "../../../libraries/Api/user/getUserData.js";

const submitOrTrack  = document.getElementById('submitOrTrack');
const infoRequired = document.getElementById('infoRequired');
/**
 * This function is triggered when the "change" event occurs on the "submitOrTrack" element.
 * It checks the value of the checkbox and adds or removes the "visually-hidden" class from the "admission" and "tracking" elements accordingly.
 * @param {Event} e - The "change" event object.
 */
const submitOrTrackFunction = (e) => {
  const { checked } = e.target;
  const admissionElement = document.getElementById('admission');
  const trackingElement = document.getElementById('tracking');

  if (checked) {
    admissionElement.classList.add('visually-hidden');
    trackingElement.classList.remove('visually-hidden');
  } else {
    trackingElement.classList.add('visually-hidden');
    admissionElement.classList.remove('visually-hidden');
  }
};

submitOrTrack.addEventListener('change', submitOrTrackFunction);

/**
 * Retrieves the value of an input field, performs validation checks, and fetches a student application based on the provided email.
 * If an application is found, it updates the HTML content and redirects the user to a specific URL.
 */
const arrow_function = async () => {
  const email = document.getElementById('trackingEmail').value;
  const errorMessage = document.getElementById('alert-Error');

  if (!email || email === '') {
    errorMessage.textContent = ErrorMessage.EmailRequired;
    errorMessage.classList.remove('visually-hidden');
    return;
  }

  const application = await GetStudentApplication(email);

  if (!application) {
    errorMessage.innerText = ErrorMessage.NoApplicationFound;
    errorMessage.classList.remove('visually-hidden');
    return;
  }

  document.getElementById('trackingLoader').innerHTML = loaderBtn;

  const url = `/student/application/student-application.html?id=${application.id}`;
  window.location.href = url;
};

document.getElementById('submit').addEventListener('click', arrow_function);

document.getElementById('submitApplication').addEventListener('click', async () => {

  const admissionFeedback = document.getElementById('admissionFeedback')
  document.getElementById('submitApplicationLoader').innerHTML = loaderBtn
  const studentInformation          = await getStudentData()
  const emergencyContactInformation = await getEmergenceContactData();
  const studentEducationInformation = await getStudentEducationData()

  const handleUserNotFound = () => {
    console.log("user not found");
    // Additional handling for user not found, if needed
    return;
  };
  
  // Code Improvement Suggestions
  // Suggestion 1: The code should handle the case when `getUserDataByEmail`, `GetStudentApplication`, and `CreateStudentApplication` functions throw an error. It can be done by wrapping these function calls inside a try-catch block.

  try {
    const userExist = await getUserDataByEmail(studentInformation.studentEmail);

    if (userExist) {
      const userHasApplied = await GetStudentApplication(studentInformation.studentEmail);
      if (!userHasApplied) {

        const application = await CreateStudentApplication(
          studentInformation,
          emergencyContactInformation,
          studentEducationInformation
        );

        const url = `/student/application/application-submitted?id=${application.applicationId}`;
        window.location.replace(url);

      } else {
        admissionFeedback.textContent = ErrorMessage.AlreadyApplied;
        document.getElementById('feedBackHolder').classList.remove('visually-hidden');
        document.getElementById('submitApplicationLoader').innerHTML = '';
      }
    } else {
      admissionFeedback.textContent = ErrorMessage.userNotFound;
      document.getElementById('feedBackHolder').classList.remove('visually-hidden');
      document.getElementById('submitApplicationLoader').innerHTML = '';
    }
  } catch (error) {
    // Handle the error here
  }
});

const Gender = {
  Male: 'Male',
  Female: 'Female'
};

const getStudentData = () => {
  const form = document.forms[0];
  const gender = form.studentGenderMale.checked ? Gender.Male : Gender.Female;
  const dob = `${form.dateSelect.value}-${form.monthSelect.value}-${form.yearSelect.value}`;

  const studentInformation = {
    studentFirstName  : form.studentFirstName.value.trim(),
    studentMiddleName : form.studentMiddleName.value.trim(),
    studentLastName   : form.querySelector('#studentLastName').value.trim(),
    gender            : gender,
    dateOfBirth       : dob,
    studentEmail      : form.studentEmail.value.trim(),
    studentPhoneNumber: form.studentPhoneNumber.value.trim(),
    studentAddress    : form.studentAddress.value.trim(),
    city              : form.citySelect.value.trim(),
    state             : form.studentState.value.trim(),
    zipCode           : form.zipCode.value.trim(),
    country           : form.countrySelect.value.trim(),
  };

  const requiredFields = ['studentFirstName', 'studentLastName', 'dateOfBirth', 'studentEmail', 'studentPhoneNumber', 'studentAddress', 'city', 'state', 'zipCode', 'country'];

  const isValidData = requiredFields.every(field => {
    // Exclude studentMiddleName from the validation
    if (field === 'studentMiddleName') {
      return true;
    }
    const value = studentInformation[field];
    return value.trim() !== '';
  });

  if (!isValidData) {
    // Handle case where required data is missing
    infoRequired.classList.remove('visually-hidden')
    document.getElementById('admission').scrollIntoView();
    document.getElementById('submitApplicationLoader').innerHTML = ''
    return null;
  }

  return studentInformation;
};

const getEmergenceContactData = () => {
  const salutationElements = {
    'Mr' : document.getElementById('parentSalutationMr'),
    'Mrs': document.getElementById('parentSalutationMrs'),
    'Ms' : document.getElementById('parentSalutationMs'),
    'Dr' : document.getElementById('parentSalutationDr'),
  };

  let salutation = '';

  for (const [title, element] of Object.entries(salutationElements)) {
    if (element.checked) {
      salutation = title;
      break;
    }
  }

  const requiredFields = ['parentFullName', 'parentRelation', 'parentEmail', 'parentPhoneNumber', 'parentHomeAddress', 'parentJobTitle'];

  const isValidData = requiredFields.every(field => {
    const value = document.getElementById(field).value;
    return value.trim() !== '';
  });

  if (!isValidData) {
    // Handle case where required data is missing
    infoRequired.classList.remove('visually-hidden')
    document.getElementById('admission').scrollIntoView();
    document.getElementById('submitApplicationLoader').innerHTML = ''
    return null;
  }

  const emergencyContact = {
    emergencyContactSalutation  : salutation,
    emergencyContactFullName    : document.getElementById('parentFullName').value,
    emergencyContactRelation    : document.getElementById('parentRelation').value,
    emergencyContactEmail       : document.getElementById('parentEmail').value,
    emergencyContactPhoneNumber : document.getElementById('parentPhoneNumber').value,
    emergencyContactHomeAddress : document.getElementById('parentHomeAddress').value,
    emergencyContactJobTitle    : document.getElementById('parentJobTitle').value,
    emergencyContactOfficeNumber: document.getElementById('parentOfficeNumber').value,
  };

  return emergencyContact;
};

/**
 * Retrieves student education data from the DOM.
 * @returns {Object} - Student education data.
 */
const getStudentEducationData = () => {
  try {
    const studentEducation = {
      schoolName            : $('#collegeName').val(),
      yearOfPassing         : $('#yearOfPassingSelect').val(),
      board                 : $('#board').val(),
      grad                  : $('#gradSelect').val(),
      schoolOrCollegeAddress: $('#schoolOrCollegeAddress').val(),
    };
    return studentEducation;
  } catch (error) {
    console.error(error);
    // Provide feedback to the user about the error
  }
}