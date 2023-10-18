import { GetAllCourseByInstructorId, GetAllCourseFAQs, GetCourseCategory, GetCourseCategoryById, GetCourseDetailsById, GetCourseLevelById, GetCoursesByCategoryId } from "../../controllers/course.js"
import { getParameterByName } from '../../security/getParameterByName.js';


const Id = getParameterByName('id')
const course  = await GetCourseDetailsById(Id)

function getValueById(id) {
    return document.getElementById(id);
}
const title = getValueById("title");
const shortDescription = getValueById("shortDescription");
const Category = getValueById("Category");
const level = getValueById("level");
const language = getValueById("language");
const time = getValueById("time");
const DiscountPrice = getValueById("DiscountPrice");
const price = getValueById("price");
const enableDiscount = getValueById("enableDiscount");
const featureCourse = getValueById("featureCourse");
const longDescription = getValueById("longDescription");


const populateCourseDetails = async (courses) => {
    const course = courses[0];

    title.value = course.title;
    shortDescription.value = course.shortDescription;
    language.value = course.language;
    time.value = course.time;
    DiscountPrice.value = course.discount;
    price.value = course.price;
    longDescription.innerHTML = course.longDescription;

    for (var i = 0; i < level.options.length; i++) {
        if (level.options[i].value === course.level) {
            level.options[i].selected = true;
        break;
        }
    }

    for (var i = 0; i < Category.options.length; i++) {
        if (Category.options[i].value === course.categoryId) {
            Category.options[i].selected = true;
        break;
        }
    }

    featureCourse.checked = course.featureCourse === true || course.featureCourse === "true";
    enableDiscount.checked = course.enableDiscount === true || course.enableDiscount === "true";
}

const populateCourseMedia = async (courses) => {
    const course = courses[0];
    document.getElementById('courseImagePreview').src = course.photo;
    document.getElementById('videoUrl').value = course.videoUrl;
    document.getElementById('videoLink').src = course.videoUrl;
    document.getElementById('videoPreview').src = course.photo;
}

const populateCourseAdditionalInfo = async (courses) => {
    const course = courses[0];
    const confirmation =  document.getElementById('confirmation')
    confirmation.checked = course.confirmation === true || course.confirmation === "Yes";
    document.getElementById('mes').value = course.message; 
}

// populateCourseDetails([course]);


populateCourseDetails(course)
const CourseMedia = document.getElementById('CourseMedia')
const Curriculum = document.getElementById('Curriculum')
const additionalInformation = document.getElementById('additionalInformation')


// controls
const detailsBtn = document.getElementById('detailsBtn').addEventListener("click", async () => {
    await populateCourseMedia(course);
    CourseMedia.classList.remove('visually-hidden')
    location.href = '#CourseMedia'
})
const courseMediaBtn = document.getElementById('courseMediaBtn').addEventListener("click", async () => {
    Curriculum.classList.remove('visually-hidden')
    location.href = '#Curriculum'
})
const curriculumBtn = document.getElementById('curriculumBtn').addEventListener("click",async  () => {
    await  populateCourseAdditionalInfo(course);
    additionalInformation.classList.remove('visually-hidden')
    location.href = '#additionalInformation'
})

const toCourseDetails = document.getElementById('toCourseDetails').addEventListener("click", () => {
    location.href = '#courseDetails'
})


//previewCourse
document.addEventListener('click', function (e)  {
    if (e.target.classList.contains('previewCourse')) {
        const courseInstructor = e.target.id
        var url = `/admin/instructors/instructor-details.html?id=${encodeURIComponent(courseInstructor)}`;
        window.location.href = url;
    }
});