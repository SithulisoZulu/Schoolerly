import { getParameterByName } from "../../security/getParameterByName.js"

const Id = getParameterByName('id');

document.getElementById('trackApplication').addEventListener('click', () => {
    const url = `/student/student-application.html?id=${Id}`;
    window.location.replace(url);
});