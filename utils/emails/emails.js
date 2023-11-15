/**
 * Sends an email using the EmailJS service.
 * @param {Object} email - An object containing the email details such as the recipient's email, title, status, date, name, surname, and message.
 * @returns {Promise} - A promise that resolves with the response if the email is sent successfully, or rejects with an error if there is an issue.
 */
export const courseSubmitted = async (email) => {
  try {
    const params = {
      email: email.email,
      title: email.title,
      status: email.status,
      date: email.date,
      name: email.name,
      surname: email.surname,
      message: email.message
    };

    const serviceId = "service_54pvnqm";
    const templateId = "template_rs8d73a";

    const response = await emailjs.send(serviceId, templateId, params);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};