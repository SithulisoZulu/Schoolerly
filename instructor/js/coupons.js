import { Timestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { GetAllCourseByInstructorId } from "../../controllers/course.js"
import { GetInstructorByEmail } from "../../controllers/instructor.js"
import { user } from "../../utils/Session.js"
import { generateCouponCode } from "../../utils/coupons/generateCouponCode.js"
import { AddCoupon } from "../../controllers/coupon.js"
import { successMessages } from "../../libraries/success/messages.js";

const email = user()

const Instructor = await GetInstructorByEmail(email)
const AllCourses = await GetAllCourseByInstructorId(Instructor.id)

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
}
populateCourses(AllCourses)


const createCoupon = async () => {
    const code = await generateCouponCode();
    const limit = document.getElementById('limit');
    const date = document.getElementById('date').value;
    let isLimited = false;
    if(limit.checked){
        isLimited = true
    };
    const jsDate = new Date(date);
    const firebaseTimestamp = Timestamp.fromDate(jsDate);
    const coupon = {
        courseId    : document.getElementById('courseSelect').value,
        name        : document.getElementById('couponName').value,
        discount    : document.getElementById('discount').value,
        quantity    : document.getElementById('quantity').value,
        instructorId: Instructor.id,
        code        : code,
        limit       : isLimited,
        date        : firebaseTimestamp
    };
    return coupon;
}

document.getElementById('submit').addEventListener("click", async () => {
    const coupon = await createCoupon();
    await AddCoupon(coupon)
    document.getElementById('message').textContent = successMessages.couponAdded + coupon.code + "Copy this code and store it safe."
    document.getElementById('success').classList.remove('visually-hidden')
    // const modal = await couponModal(body, application.id)
    // modalHolder.innerHTML = modal
    // $("#applicationDetailsModal").modal('show')
})

//Coupon Details holder
const courseSelect = document.getElementById('courseSelect').addEventListener("change", (e) => {
    if(e.target.value !== "" && e.target.value !== null && e.target.value !== 'Choose a course to create a coupon')
    {
       document.getElementById('details').classList.remove('visually-hidden');
        // document.getElementById('couponName').value = e.target.textContent.replace(/\s{2,}/g,' ') + "(Suggested based on the selected course, You can change)"
    }
})


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

// Prevent letters from the quantity field
$('#quantity').on('keypress', function(e){
    return e.metaKey || // cmd/ctrl
      e.which <= 0 || // arrow keys
      e.which == 8 || // delete key
      /[0-9]/.test(String.fromCharCode(e.which)); // numbers
  })


// Coupon details Section Controls
document.getElementById('createCoupon').addEventListener('click', () => {
    document.getElementById('couponDetailsSection').classList.remove('visually-hidden');
})

document.getElementById('cancel').addEventListener('click', () => {
    document.getElementById('couponDetailsSection').classList.add('visually-hidden');
})