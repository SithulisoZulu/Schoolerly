import { GetAllCourseByInstructorId, GetAllCourseFAQs, GetCourseCategory, GetCourseCategoryById, GetCourseDetailsById, GetCourseLevelById, GetCoursesByCategoryId } from "../../controllers/course.js"
import { GetInstructorById, GetSocials } from "../../../controllers/user.js";
import { getParameterByName } from '../../../security/getParameterByName.js';
import { applyCoupon } from "../../utils/coupons/applyCoupon.js";
import { loaderBtn } from "../../components/loading.js";

const load =  loaderBtn

const Id = getParameterByName('id')
const elements = document.querySelectorAll(".courseBtn");

elements.forEach(element => {
    element.setAttribute("id", Id);
});

const course  = await GetCourseDetailsById(Id)
export const courseId = await course[0].courseId

const getCourseDetailsById = async (course) => {
    handleIntro(await course);
    handleOverView(await course)
    handleRightSidebar(await course)
    handleRightCourseIfo(await course)
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


//View Course Details
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

}


//View Instructor Details
document.addEventListener('click', function (e)  {
    if(e.target.classList.contains('viewCourse')) {
        const categoryId = e.target.id
        var url = `/instructor/edit-course-details.html?id=${encodeURIComponent(categoryId)}`;
        window.location.href=url;
    }
    
});


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