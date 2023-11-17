import { GetStudentApplication } from "../../../controllers/applicationController.js";
import { ErrorMessage } from "../../../libraries/errors/messages.js";
import { loaderBtn } from "../../../components/loading.js";

const submitOrTrack  = document.getElementById('submitOrTrack');

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

  const url = `/student/student-application.html?id=${application.id}`;
  window.location.href = url;
};

document.getElementById('submit').addEventListener('click', arrow_function);