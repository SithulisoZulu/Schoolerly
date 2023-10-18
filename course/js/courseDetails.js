import { GetAllCourseByInstructorId, GetAllCourseFAQs, GetCourseCategory, GetCourseCategoryById, GetCourseDetailsById, GetCourseLevelById, GetCoursesByCategoryId } from "../../controllers/course.js"
import { GetInstructorById, GetSocials } from "../../../controllers/user.js";
import { getParameterByName } from '../../../security/getParameterByName.js';
import { applyCoupon } from "../../utils/coupons/applyCoupon.js";
import { loaderBtn } from "../../components/loading.js";
import { user } from "../../utils/Session.js";

const load =  loaderBtn

const Id = getParameterByName('id')
const course  = await GetCourseDetailsById(Id)
export const courseId = await course[0].courseId

const getCourseDetailsById = async (course) => {
    handleIntro(await course);
    handleOverView(await course)
    handleRightSidebar(await course)
    handleRightCourseIfo(await course)
}

const OnGet = async (course) => {
    await getAllCourseCategories()
}

const handleIntro = async (courses) => {
    const course = courses[0]
    document.getElementById('title').textContent = course.title
    document.getElementById('description').textContent = course.shortDescription
    document.getElementById('enrolled').textContent = course.enrolled
    document.getElementById('lang').textContent = course.language

    const date = course.creationDate.toDate().toDateString();
    document.getElementById('updated').textContent = date

    const levels = await GetCourseLevelById(course.level)
    document.getElementById('level').textContent = levels.name
    document.getElementById('lev').textContent = levels.name

    const category = await GetCourseCategoryById(course.categoryId)
    document.getElementById('cat').textContent = category.name

    getCourseByCategory(course.categoryId)
}

const handleOverView = async (courses) => {
    const course = courses[0] 

    document.getElementById('longDescription').textContent = course.longDescription
}

const handleRightSidebar = async (courses) => {
    const course = courses[0] 

    document.getElementById('courseImage').src = course.photo
    document.getElementById('courseVideo').href = course.videoUrl

    if(course.enableDiscount === "true")
    {
        let percentage = ((course.discount / course.price) * 100);
        let total = course.price - course.discount
        document.getElementById('pec').textContent = percentage
        if(total === 0)
        {
            document.getElementById('total').textContent = "Free"
            document.getElementById('currency').classList.add('visually-hidden')
        }
        else{
         document.getElementById('total').textContent = total
        }
        document.getElementById('dis').textContent = course.discount
    }
    else{
        document.getElementById('tot').classList.add("visually-hidden")
        document.getElementById('total').textContent = course.price
        document.getElementById('off').classList.add("visually-hidden") 
    }
    const copy = document.getElementById('copy')
    copy.addEventListener('click', function(event) {
        var cpLink = window.location.href;
        console.log(cpLink)
        var tempTextarea = document.createElement('textarea');
        tempTextarea.value = cpLink;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
      
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Copy command was ' + msg);
        } catch (err) {
          console.log('Oops, unable to copy');
        }
        event.preventDefault;
    });

    const twitterShare = document.getElementById("twitter").addEventListener("click", () => {
        var url = window.location.href;
        const text = "Schoolerly Course: "
        shareOnTwitter(url, text)
    })
    const linkedInShare = document.getElementById("linkedin").addEventListener("click", () => {
        var url = window.location.href;
        const title = "Schoolerly Course: "
        const summary = "Sum"
    })

    
}

function shareOnTwitter(url, text) {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
}


const handleRightCourseIfo = async (courses) => {
    const course = courses[0]
    getInstructorById(course.userId)
    document.getElementById('courseTime').textContent = course.time
    document.getElementById('lang').textContent = course.language
}

const getAllCourseCategories = async () => {
    const alCategories = await GetCourseCategory()
    const categoriesHolder = document.getElementById('categories');
    alCategories.forEach(loadCourses)
    async function loadCourses(cat) {
        var category = 
        `
            <li  class="list-inline-item mb-2" > <a id="${cat.id}"  class="btn btn-outline-light btn-sm viewCourses" >${cat.name}</a> </li>
        `
        categoriesHolder.innerHTML += category;
    }
}

//View Instructor Details
document.addEventListener('click', function (e)  {
    if(e.target.classList.contains('viewCourses')) {
        const categoryId = e.target.id
        var url = `/course/category-courses.html?id=${encodeURIComponent(categoryId)}`;
        window.location.href=url;
    }
    
});


const getInstructorById = async (Id) => {
    const Instructor = await GetInstructorById(Id)
    document.getElementById('instructorImage').src = Instructor.photo
    document.getElementById('fullName').textContent = Instructor.Name + " "+ Instructor.Surname
    document.getElementById('instructorEmail').textContent = Instructor.email
    document.getElementById('instructorEmail').href = `mailTo:${Instructor.email}`
    if(Instructor.About){
        document.getElementById('aboutInstructor').textContent = Instructor.About
    }
    else{
        document.getElementById('aboutInstructor').textContent = "N/A"
    }

    const socials = await GetSocials(Instructor.id)
    if(socials)
    {
        document.getElementById('socialsTwitter').href = socials.twitter
        document.getElementById('socialsFacebook').href = socials.facebook
        document.getElementById('socialsInstagram').href = socials.instagram
        document.getElementById('socialsYoutube').href = socials.youtube
    }

    getInstructorCourses(Id)
}

const getInstructorCourses = async (Id) => {
    const courses = await GetAllCourseByInstructorId(Id)
    const courseId = getParameterByName('id')
    const InstructorCourseHolder = document.getElementById('InstructorCourseHolder');
    let filteredCourses = courses.filter(function (course) {
        return course.courseId !== courseId;
    });
    
    if (filteredCourses.length === 0) {
        var no = `
            <div class="card border bg-transparent rounded-3 mt-2 mb-2 text-white-50" id="noCourses">
                No Course Found!
            </div>
        `
        InstructorCourseHolder.innerHTML += no;
    } else {
        let newCourses = filteredCourses.slice(0, 3).map(function (course) {
            var courseHTML = `
                <!-- Course item START -->
                <div class="row gx-3 mb-3">
                    <!-- Image -->
                    <div class="col-4">
                        <img class="rounded object-fit-cover" src="${course.photo}" alt="rtt" width="120" height="70">
                    </div>
                    <!-- Info -->
                    <div class="col-8">
                        <h6 class="mb-0"><a class="text-decoration-none text-white fw-bold viewCourse" id="${course.courseId}" style="cursor: pointer;">${course.title}</a></h6>
                        <ul class="list-group list-group-borderless mt-1 d-flex justify-content-between">
                            <li class="list-group-item px-0 d-flex justify-content-between border-0">
                                <span class="text-success">R ${course.price}</span>
                                <span class="h6 fw-light">4.5<i class="fas fa-star text-warning ms-1"></i></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Course item END -->
            `;
            InstructorCourseHolder.innerHTML += courseHTML;
        });
    }
    
    
}

//View Instructor Details
document.addEventListener('click', function (e)  {
    if(e.target.classList.contains('viewCourse')) {
        const categoryId = e.target.id
        var url = `/course/course-details.html?id=${encodeURIComponent(categoryId)}`;
        window.location.href=url;
    }
    
});

const getCourseByCategory = async (Id) => {
    const courses = await GetCoursesByCategoryId(Id)
    const courseId = getParameterByName('id')
    const relatedCourses = document.getElementById('relatedCourses');
    const Instructor = await GetInstructorById(courses[0].userId)
    let newRelatedCourse = courses.filter(function (course, index) {
        return course.courseId !== courseId && index;
    }).map(function (course) {
       var relatedCourse =
       `
       <!-- Card item START -->
       <div class="col-md-6 col-xxl-4 mb-3">
           <div class="card bg-transparent border h-100"> 
               <!-- Card header -->
               <div class="card-header bg-transparent border-bottom d-flex align-items-sm-center justify-content-between">
                   <div class="d-sm-flex align-items-center">
                       <!-- Avatar -->
                       <div class="avatar avatar-md flex-shrink-0">
                           <img class="avatar-img rounded-circle" src="${course.photo}" alt="avatar" width="50" height="50" style="object-fit: cover;"> 
                       </div>
                       <!-- Info -->
                       <div class="ms-0 ms-sm-2 mt-2 mt-sm-0">
                           <h5 class="mb-2" style="padding-left: 7px; font-weight:700;" ><a id="${course.courseId}"  class="text-white text-decoration-none viewCourse stretched-link" style="cursor: pointer;" >${course.title}</a></h5>
                           <p class="mb-0 small" style="padding-left: 8px;">${Instructor.Name}</p>
                       </div>
                   </div>
               </div>
   
               <div class="card-body">
                   <!-- Total students -->
                   <div class="d-flex justify-content-between align-items-center mb-3">
                       <div class="d-flex align-items-center">
                           <div class="icon-md bg-warning bg-opacity-10 text-warning p-2 pt-2 pb-2 rounded-circle flex-shrink-0"><i class="fas fa-user-graduate fa-fw" style="font-size: 1.3rem;"></i></div>
                           <h6 class="mb-0 ms-2 fw-light">Enrolled Students</h6>
                       </div>
                       <span class="mb-0 fw-bold">${course.enrolled}</span>
                   </div>
   
                   <!-- Total courses -->
                   <div class="d-flex justify-content-between align-items-center">
                       <div class="d-flex align-items-center">
                           <div class="icon-md bg-success  p-2 pt-2 pb-2 bg-opacity-10 text-success rounded-circle flex-shrink-0"><i class="fas fa-clock-four fa-fw" style="font-size: 1.3rem;"></i></div>
                           <h6 class="mb-0 ms-2 fw-light">${course.time}</h6>
                       </div>
                       <span class="mb-0 fw-bold">4 Hours</span>
                   </div>
               </div>

           </div>
       </div>
       <!-- Card item END -->
        `;
        relatedCourses.innerHTML += relatedCourse;
    });
}

const coupon = document.getElementById("applyCoupon").addEventListener("click", () => {
    document.getElementById('coupon').classList.remove("visually-hidden")
})

const applyCouponBtn = document.getElementById('applyCouponBtn').addEventListener("click", async () =>{
    const email = user();
    document.getElementById('loader').innerHTML = load
    const code = document.getElementById('code').value;
    const courseDetails  = await course
    await applyCoupon(Id, code, courseDetails, email)
})

const getAllCourseFAQs = async(course) =>{
    const id  = course[0].courseId;
    const faqs = await GetAllCourseFAQs(id);
    const faqsHolder = document.getElementById('topics')
    if (faqs.length === 0) {
        var no = `
            <div class="card border bg-transparent rounded-3 mt-2 mb-2 text-white-50" id="noCourses">
                No FAQs Provided for this course.
            </div>
        `
        faqsHolder.innerHTML += no;
    }
    for (let i = 0; i < faqs.length; i++) {
        let cId = crypto.randomUUID();
        var faq = `
            <!-- Item -->
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${cId}" aria-expanded="true" aria-controls="${cId}">
                        <span class="text-secondary fw-bold me-3">${i + 1}</span>  
                        <span class="h6 mb-0">${faqs[i].question}</span> 
                    </button>
                </h2>
                <div id="${cId}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body pt-0">
                        ${faqs[i].answer}
                    </div>
                </div>
            </div>
        `;
    
        faqsHolder.innerHTML += faq;
    
        // Remove the "show" class from the second item onwards
        if (i > 1) {
            const accordionItem = faqsHolder.querySelector('.accordion-item:last-child');
            const collapseDiv = accordionItem.querySelector('.accordion-collapse');
            collapseDiv.classList.remove('show');
        }
    }
    
    
}

getAllCourseFAQs(course)
getCourseDetailsById (course)
OnGet()