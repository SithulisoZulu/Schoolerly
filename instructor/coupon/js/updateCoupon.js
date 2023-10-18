import { Timestamp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { GetCouponByCode, UpdateCoupon } from "../../../controllers/coupon.js";
import { GetAllCourses, GetCourseDetailsById } from "../../../controllers/course.js";
import { getParameterByName } from "../../../security/getParameterByName.js";
import { loaderBtn } from "../../../components/loading.js";

const couponCode = getParameterByName('code')

const load =  loaderBtn

const coupon = await GetCouponByCode(couponCode)
const course = await GetCourseDetailsById(coupon.courseId)
const courses = await GetAllCourses()

const populateCourses = async (courses) => {
    const courseSelect = document.getElementById('courseSelect')
    for(let i = 0; i < courses.length; i++ )
    {
        var courseOption = 
        `
            <option value="${courses[i].courseId}">${courses[i].title}</option>
        `
        courseSelect.innerHTML += courseOption;
    }
    for (var i = 0; i < courseSelect.options.length; i++) {
        if (courseSelect.options[i].value === course[0].courseId) {
            courseSelect.options[i].selected = true;
        break;
        }
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