import { Timestamp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { GetCouponByCode, UpdateCoupon } from "../../../controllers/coupon.js";
import { GetAllCourseByInstructorId, GetAllCourses, GetCourseDetailsById } from "../../../controllers/course.js";
import { getParameterByName } from "../../../security/getParameterByName.js";
import { loaderBtn } from "../../../components/loading.js";
import { GetInstructorByEmail } from "../../../controllers/instructor.js";
import { user } from "../../../utils/Session.js";

const couponCode = getParameterByName('code')

const load =  loaderBtn

const email = user();

const Instructor = await GetInstructorByEmail(email)
const coupon = await GetCouponByCode(couponCode)
const course = await GetCourseDetailsById(coupon.courseId)
const courses = await GetAllCourseByInstructorId(Instructor.id)

const populateCourses = async (courses) => {
    const courseSelect = document.getElementById('courseSelect');
    
    // Create a "Select a course" option as the first option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select a course';
    courseSelect.appendChild(defaultOption);

    for (let i = 0; i < courses.length; i++) {
        var courseOption = document.createElement('option');
        courseOption.value = courses[i].courseId;
        courseOption.text = courses[i].title;
        courseSelect.appendChild(courseOption);
    }
}
populateCourses(courses)

const populateCouponInfo = async (coupon) => {
    document.getElementById('couponName').value = coupon.name
    document.getElementById('discount').value = coupon.discount
    document.getElementById('quantity').value = coupon.quantity
    const date = document.getElementById('date')
    const firestoreTimestamp = coupon.date 
    const jsDate = firestoreTimestamp.toDate();
    const formattedDate = jsDate.toISOString().slice(0, 16);
    date.value = formattedDate
    const limit = document.getElementById('limit')
    limit.checked = coupon.limit === true || coupon.limit === "true";
    document.getElementById('addQuantity').classList.remove("visually-hidden")

    for(let i = 0;i < courses.length; i++)
    {
        if(courses[i].courseId == coupon.courseId){
            const courseSelect = document.getElementById('courseSelect');
            console.log(courses[i].courseId)
        }
    }
    const courseSelect = document.getElementById('courseSelect');
    for (let j = 0; j < courseSelect.options.length; j++) {
        if (courseSelect.options[j].value == coupon.courseId) {
            courseSelect.options[j].selected = true;
            break; // Exit the loop once the option is found and selected
        }
    }
}

populateCouponInfo(coupon);

//Quantity Controls
const limit = document.getElementById('limit').addEventListener('change', (e) => {
    if(e.target.checked === true)
    {
        document.getElementById('addQuantity').classList.remove("visually-hidden")
    }else{
        document.getElementById('addQuantity').classList.add("visually-hidden")
        document.getElementById('quantity').value = ""
    }
})
document.addEventListener("DOMContentLoaded", function() {
    populateCouponInfo(coupon);
});


document.getElementById("submit").addEventListener("click", async () => {
    document.getElementById('loader').innerHTML = load
    const limit = document.getElementById('limit');
    const date = document.getElementById('date').value;
    let isLimited = false;
    if(limit.checked){
        isLimited = true
    };
    const jsDate = new Date(date);
    const firebaseTimestamp = Timestamp.fromDate(jsDate);
    const UpdatedCoupon = {
        courseId    : document.getElementById('courseSelect').value,
        name        : document.getElementById('couponName').value,
        discount    : document.getElementById('discount').value,
        quantity    : document.getElementById('quantity').value,
        limit       : isLimited,
        date        : firebaseTimestamp
    };
    await UpdateCoupon(UpdatedCoupon, coupon.code)
    document.getElementById('loader').classList.add('visually-hidden')
    document.getElementById('success').classList.remove('visually-hidden')
})