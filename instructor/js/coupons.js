import { Timestamp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { GetAllCourseByInstructorId, GetCourseDetailsById } from "../../controllers/course.js"
import { GetInstructorByEmail } from "../../controllers/instructor.js"
import { user } from "../../utils/Session.js"
import { generateCouponCode } from "../../utils/coupons/generateCouponCode.js"
import { AddCoupon, DeleteCoupon, GetCouponByCode, GetInstructorCoupons } from "../../controllers/coupon.js"
import { successMessages } from "../../libraries/success/messages.js";
import { courseLimit, courseQuantity } from "../../utils/coupons.js";
import { loaderBtn } from "../../components/loading.js";


const load =  loaderBtn

const email = user();

const Instructor = await GetInstructorByEmail(email)
const AllCourses = await GetAllCourseByInstructorId(Instructor.id)

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
    tableData.innerHTML = ""
    if(coupons.length <= 0) 
    {
        document.getElementById('noCoupons').classList.remove('visually-hidden');
        return;
    }
    else{
        tableData.innerHTML = " "
        document.getElementById('noCoupons').classList.add('visually-hidden');
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
                    <td class="cellToCopy" id="cellToCopy" style="cursor: copy;">${coupon.code}</td>
            
                    <!-- Table data -->
                    <td>
                        <div class="d-flex align-items-center mb-3 mt-2">
                            <!-- Avatar -->
                            <div class="avatar avatar-xs flex-shrink-0">
                                <img class="avatar-img rounded-circle" src="${course[0]?.photo}" alt="avatar" width="40" height="40" style="object-fit: cover;"> 
                            </div>
                            <!-- Info -->
                            <div class="ms-2 visually-hidden">
                                <h6 class="mb-0 fw-light text-white " style="padding-left: 7px;">${course[0].title}</h6>
                            </div>
                        </div>
                    </td>
    
                    <!-- Table data -->
                  
    
                    <!-- Table data -->
                    <td>${quantity}</td>
            
                    <!-- Table data -->
                    <td>${coupon.discount}%</td>
            
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

//Delete coupon
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('deleteCoupon')) {
        const button = e.target;
        const loader = document.createElement('span');
        loader.innerHTML = load;
        loader.classList.add('loader');

        // Append the loader inside the button
        button.appendChild(loader);

        const id = button.id;
        
        // Disable the button while processing
        button.disabled = true;

        try {
            await DeleteCoupon(id);
            // Optionally, provide feedback to the user
            console.log('Coupon deleted successfully!');
            getInstructorCoupons(Instructor.id);
        } catch (error) {
            console.error('An error occurred while deleting the coupon:', error);
        } finally {
            // Remove the loader and enable the button
            button.removeChild(loader);
            button.disabled = false;
        }
    }
});

//Coupon Details holder
const courseSelect = document.getElementById('courseSelect').addEventListener("change", (e) => {
    if(e.target.value !== "" && e.target.value !== null && e.target.value !== 'Choose a course to create a coupon' || e.target.value === e.target.value)
    {     
       document.getElementById('details').classList.remove('visually-hidden');
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
const toastContent = document.querySelector('.toast');
const toast = new bootstrap.Toast(toastContent);
document.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.classList.contains('cellToCopy'))
    {
        console.log('clicked')
        copyText()
        toast.show();
    }
})

function copyText() {
    // Select the text inside the <td> element
    const textToCopy = document.getElementById('cellToCopy').innerText;

    // Create a temporary textarea element and set its value to the text to copy
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(textarea);
}