import { route } from '../../routers/router.js'
import { sanitizeInput } from '../../libraries/sanitizer.js'
import { ErrorMessage }  from '../../libraries/errors/messages.js'
import { CreateCourse } from '../../controllers/course.js'
import { loader } from '../../components/loading.js'


const loaderHolder = document.getElementById("loaderHolder")

const submit = document.getElementById('submit').addEventListener("click", (e) =>
{  
    if(navigator.onLine)
    {
        checkData();
    }
    else {
      location.replace(route.offlinePageUrl);
    }

});

const sanitizeData = (data) => {
    const sanitizedData = {};
    Object.keys(data).forEach((key) => {
      sanitizedData[key] = sanitizeInput(data[key]);
    });
    return sanitizedData;
};

async function checkData() {

    function getValueById(id) {
        return document.getElementById(id).value;
    }

    function showError(message) {
        document.getElementById("error").classList.remove("visually-hidden");
        document.getElementById("error-message").textContent = message;
    }

    const fields = ["title", "shortDescription", "Category", "level", "language", "time", "price", "DiscountPrice", "longDescription"];
    const allFieldsFilled = fields.every(field => getValueById(field));
    const feature = document.getElementById('featureCourse');
    let featureCourse = "false"
    let EnableDiscount = "false"
    if(feature.checked){
        featureCourse = true
    }
    const discount = document.getElementById('enableDiscount');
    if(discount.checked){
        EnableDiscount = true
    }
    if (!allFieldsFilled) {
        showError(ErrorMessage.dataNeeded);
    } else {

        const data = {
            title           : getValueById("title"),
            shortDescription: getValueById("shortDescription"),
            Category        : getValueById("Category"),
            level           : getValueById("level"),
            language        : getValueById("language"),
            time            : getValueById("time"),
            price           : getValueById("price"),
            DiscountPrice   : getValueById("DiscountPrice"),
            longDescription : getValueById("longDescription"),
            enableDiscount  : EnableDiscount,
            featureCourse   : featureCourse
        };
        const sanitizedData =  sanitizeData(data);
        loaderHolder.innerHTML += loader
        const course = await CreateCourse(sanitizedData)

        redirectToMediaUploadPage(course.id, course.doc)
    }
}

function redirectToMediaUploadPage(id, DocId) {
    try {
      var url = `${route.instructorUploadCourseMedia}?id=${encodeURIComponent(id)}&doc=${encodeURIComponent(DocId)}`;
      window.location.replace(url);
    } 
    catch (error) {
      console.log(error);
      throw error
    }
}