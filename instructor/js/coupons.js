import { Timestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { GetAllCourseByInstructorId, GetCourseDetailsById } from "../../controllers/course.js"
import { GetInstructorByEmail } from "../../controllers/instructor.js"
import { user } from "../../utils/Session.js"
import { generateCouponCode } from "../../utils/coupons/generateCouponCode.js"
import { AddCoupon, DeleteCoupon, GetCouponByCode, GetInstructorCoupons } from "../../controllers/coupon.js"
import { successMessages } from "../../libraries/success/messages.js";
import { courseLimit, courseQuantity } from "../../utils/coupons.js";
import { loaderBtn } from "../../components/loading.js";
import { openModal } from "../../components/updateCoupon.js";

const load =  loaderBtn

const email = user();

const modalHolder = document.getElementById('modal')

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
    document.getElementById('loader').innerHTML = load
    const coupon = await createCoupon();
    await AddCoupon(coupon);
    getInstructorCoupons(Instructor.id);
    document.getElementById('message').textContent = successMessages.couponAdded + coupon.code;
    document.getElementById('success').classList.remove('visually-hidden');
    document.getElementById('loader').classList.add('visually-hidden');
})

const getInstructorCoupons = async (id) => {
    const coupons =  await GetInstructorCoupons(id)
    var tableData = document.getElementById("tableData");
    tableData.innerHTML = " "
    if(coupons.length < 0) 
    {
        document.getElementById('noCoupons').classList.remove('visually-hidden');
        return;
    }
    else{
        tableData.innerHTML = " "
        document.getElementById('noCoupons').classList.add('visually-hidden');  
    }
    coupons.forEach(loadCourses)
    async function loadCourses(coupon) {
        const course = await GetCourseDetailsById(coupon.courseId)
        const limit = await courseLimit(coupon.limit)
        const quantity = await courseQuantity(coupon.quantity, coupon.limit)
        const date = coupon.date.toDate().toDateString();

        var courseData = 
        `
            <tr>
                <!-- Table data -->
                <td>
                    <div class="d-flex align-items-center position-relative">
                        <!-- Name -->
                        <h6 class="table-responsive-title mb-0 ms-2" style="padding-left: 7px; font-weight:700;">	
                            <a  class="stretched-link text-white text-decoration-none viewCourseDetails" id="${coupon.code}" style="cursor: pointer;">${coupon.name}</a>
                        </h6>
                    </div>
                </td>
        
                <!-- Table data -->
                <td>
                    <div class="d-flex align-items-center mb-3 mt-2">
                        <!-- Avatar -->
                        <div class="avatar avatar-xs flex-shrink-0">
                            <img class="avatar-img rounded-circle" src="${course[0].photo}" alt="avatar" width="40" height="40" style="object-fit: cover;"> 
                        </div>
                        <!-- Info -->
                        <div class="ms-2 visually-hidden">
                            <h6 class="mb-0 fw-light text-white " style="padding-left: 7px;">${course[0].title}</h6>
                        </div>
                    </div>
                </td>

                <!-- Table data -->
                <td> ${limit}</td>

                <!-- Table data -->
                <td>${quantity}</td>
        
                <!-- Table data -->
                <td>${coupon.discount}</td>
        
                <!-- Table data -->
                <td>${date}</td>

                <!-- Table data -->
                <td class="">
                    <a class="btn btn-sm bg-success bg-opacity-25 me-1 mb-1 mb-md-0 editCoupon" id='${coupon.code}'>Edit <i class="fa-solid fa-pen"></i> <span id="editCouponLoader"></span></a>
                    <button class="btn btn-sm bg-danger bg-opacity-25 mb-0 deleteCoupon" id='${coupon.code}'>Delete <i class="fa-solid fa-trash"></i> <span id="DeleteCouponLoader"></span></button>
                </td>
            </tr>
        `
        tableData.innerHTML += courseData;
    }
    return await coupons
}

getInstructorCoupons(Instructor.id)


//View Instructor Details
document.addEventListener('click', function (e)  {
    if(e.target.classList.contains('editCoupon')) {
        const couponCode = e.target.id
        var url = `/instructor/coupon/update-Coupon.html?code=${encodeURIComponent(couponCode)}`;
        window.location.href=url;
    }
    
});

const updateCoupon = async (coupon) => {
    const modal = await openModal(coupon)
    modalHolder.innerHTML = modal
    $("#updateCouponModal").modal('show')

}

//Delete coupon
document.addEventListener('click',  async (e) =>  {
    if (e.target.classList.contains('deleteCoupon')) {
        const loader = document.getElementById('DeleteCouponLoader')
        loader.innerHTML = load;
        const id = e.target.id;
        await DeleteCoupon(id);
        loader.classList.add('visually-hidden');
        getInstructorCoupons(Instructor.id);
    }
});
  
//Coupon Details holder
const courseSelect = document.getElementById('courseSelect').addEventListener("change", (e) => {
    if(e.target.value !== "" && e.target.value !== null && e.target.value !== 'Choose a course to create a coupon')
    {     
       document.getElementById('details').classList.remove('visually-hidden');
    //    document.getElementById('couponName').value = e.target.textContent.replace(/\s{2,}/g,' ') + "(Suggested based on the selected course, You can change)"
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