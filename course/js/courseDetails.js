import { GetAllCourseByInstructorId, GetAllCourseComments, GetAllCourseFAQs, GetAllCourseLearnings, GetAllCourseReviews, GetCommentReplies, GetCourseCategory, GetCourseCategoryById, GetCourseDetailsById, GetCourseLevelById, GetCoursesByCategoryId, GetReviewReplies, PostComment, PostReview } from "../../controllers/course.js"
import { GetInstructorById, GetSocials } from "../../../controllers/user.js";
import { getParameterByName } from '../../../security/getParameterByName.js';
import { applyCoupon } from "../../utils/coupons/applyCoupon.js";
import { loaderBtn } from "../../components/loading.js";
import { feedback } from "../../components/notFound.js";
import { GetUserDetailsById } from "../../controllers/user.js";
import { checkUserRating } from "../../utils/checkUserRating.js";
import { checkCourseTotalRatings } from "../../utils/checkCourseTotalReviews.js";

const  load           = loaderBtn
const  cartFeedback   = document.getElementById('couponErrorHolder')
const  Id             = getParameterByName('id')
const  course         = await GetCourseDetailsById(Id)
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
    const                   course                     = courses[0]
    document.getElementById('title').textContent       = course.title
    document.getElementById('description').textContent = course.shortDescription
    document.getElementById('enrolled').textContent    = course.enrolled
    document.getElementById('lang').textContent        = course.language

    const                   date                   = course.creationDate.toDate().toDateString();
    document.getElementById('updated').textContent = date

    const                   levels               = await GetCourseLevelById(course.level)
    document.getElementById('level').textContent = levels.name
    document.getElementById('lev').textContent   = levels.name

    const                   category           = await GetCourseCategoryById(course.categoryId)
    document.getElementById('cat').textContent = category.name

    getCourseByCategory(course.categoryId)
}

const handleOverView = async (courses) => {
    const course = courses[0]

    document.getElementById('longDescription').textContent = course.longDescription
}

const handleRightSidebar = async (courses) => {
    const course = courses[0]

    document.getElementById('courseImage').src  = course.photo
    document.getElementById('courseVideo').href = course.videoUrl

    if(course.enableDiscount === "true")
    {
        let                     percentage         = ((course.discount / course.price) * 100);
        let                     total              = course.price - course.discount
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
        var tempTextarea       = document.createElement('textarea');
            tempTextarea.value = cpLink;
        document.body.appendChild(tempTextarea);
        tempTextarea.select(); 
        try {
            var successful = document.execCommand('copy');
            var msg        = successful ? 'successful' : 'unsuccessful';
            console.log('Copy command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    
        document.body.removeChild(tempTextarea);  // Hide the text area after copying
        event.preventDefault();
    });
    
    const twitterShare = document.getElementById("twitter").addEventListener("click", () => {
        var   url  = window.location.href;
        const text = "Schoolerly Course: "
        shareOnTwitter(url, text)
    })
    const linkedInShare = document.getElementById("linkedin").addEventListener("click", () => {
        var   url     = window.location.href;
        const title   = "Schoolerly Course: "
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
    document.getElementById('lang').textContent       = course.language
}

const getAllCourseCategories = async () => {
    const alCategories     = await GetCourseCategory()
    const categoriesHolder = document.getElementById('categories');
    alCategories.forEach(loadCourses)
    async function loadCourses(cat) {
        var category = 
        `
            <li class ="list-inline-item mb-2"><a href="/course/category-courses.html?id=${cat.id}" id ="${cat.id}"  class = "btn btn-outline-light btn-sm viewCourses" >${cat.name}</a> </li>
        `
        categoriesHolder.innerHTML += category;
    }
}


const getInstructorById = async (Id) => {
    const                   Instructor                     = await GetInstructorById(Id)
    document.getElementById('instructorImage').src         = Instructor.photo
    document.getElementById('fullName').textContent        = Instructor.Name + " "+ Instructor.Surname
    document.getElementById('instructorEmail').textContent = Instructor.email
    document.getElementById('instructorEmail').href        = `mailTo:${Instructor.email}`
    if(Instructor.About){
        document.getElementById('aboutInstructor').textContent = Instructor.About
    }
    else{
        document.getElementById('aboutInstructor').textContent = "N/A"
    }

    const socials = await GetSocials(Instructor.id)
    if(socials)
    {
        document.getElementById('socialsTwitter').href   = socials.twitter
        document.getElementById('socialsFacebook').href  = socials.facebook
        document.getElementById('socialsInstagram').href = socials.instagram
        document.getElementById('socialsYoutube').href   = socials.youtube
    }

    getInstructorCourses(Id)
}

const getInstructorCourses = async (Id) => {
    const courses                = await GetAllCourseByInstructorId(Id)
    const courseId               = getParameterByName('id')
    const InstructorCourseHolder = document.getElementById('InstructorCourseHolder');
    let   filteredCourses        = courses.filter(function (course) {
        return course.courseId !== courseId;
    });
    
    if (filteredCourses.length === 0) {
        InstructorCourseHolder.innerHTML += await feedback("No Course Found!");
    } else {
        filteredCourses.slice(0, 3).map(function (course) {
            var courseHTML = `
                <!-- Course item START -->
                <div class = "row gx-3 mt-3">
                    <!-- Image -->
                    <div class = "col-4">
                    <img class = "rounded object-fit-cover" src = "${course.photo}" alt = "rtt" width = "120" height = "70">
                    </div>
                    <!-- Info -->
                    <div  class = "col-8">
                    <h6   class = "mb-0"><a href="/course/course-details.html?id=${course.courseId}"  class="text-decoration-none text-white fw-bold viewCourse" id = "${course.courseId}" style = "cursor: pointer;">${course.title}</a></h6>
                    <ul   class = "list-group list-group-borderless mt-1 d-flex justify-content-between">
                    <li   class = "list-group-item px-0 d-flex justify-content-between border-0">
                    <span class = "text-success">R ${course.price}</span>
                    <span class = "h6 fw-light">4.5<i class = "fas fa-star text-warning ms-1"></i></span>
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
const getCourseByCategory = async (Id) => {
    const courses          = await GetCoursesByCategoryId(Id)
    const courseId         = getParameterByName('id')
    const relatedCourses   = document.getElementById('relatedCourses');
    const Instructor       = await GetInstructorById(courses[0].userId)
    courses.filter(function (course, index) {
        return course.courseId !== courseId && index;
    }).map(function (course) {
       var relatedCourse = 
       `
       <!-- Card item START -->
       <div class = "col-md-6 col-xxl-4 mb-3">
       <div class = "card bg-transparent border h-100">
               <!-- Card header -->
               <div class = "card-header bg-transparent border-bottom d-flex align-items-sm-center justify-content-between">
               <div class = "d-sm-flex align-items-center">
                       <!-- Avatar -->
                       <div class = "avatar avatar-md flex-shrink-0">
                       <img class = "avatar-img rounded-circle" src = "${course.photo}" alt = "avatar" width = "50" height = "50" style = "object-fit: cover;">
                       </div>
                       <!-- Info -->
                       <div class = "ms-0 ms-sm-2 mt-2 mt-sm-0">
                       <h5  class = "mb-2" style       = "padding-left: 7px; font-weight:700;" ><a href="/course/course-details.html?id=${course.courseId}" id = "${course.courseId}"  class = "text-white text-decoration-none stretched-link" style = "cursor: pointer;" >${course.title}</a></h5>
                       <p   class = "mb-0 small" style = "padding-left: 8px;">${Instructor.Name}</p>
                       </div>
                   </div>
               </div>
   
               <div class = "card-body">
                   <!-- Total students -->
                   <div class = "d-flex justify-content-between align-items-center mb-3">
                   <div class = "d-flex align-items-center">
                   <div class = "icon-md bg-warning bg-opacity-10 text-warning p-2 pt-2 pb-2 rounded-circle flex-shrink-0"><i class = "fas fa-user-graduate fa-fw" style = "font-size: 1.3rem;"></i></div>
                   <h6  class = "mb-0 ms-2 fw-light">Enrolled Students</h6>
                       </div>
                       <span class = "mb-0 fw-bold">${course.enrolled}</span>
                   </div>
   
                   <!-- Total courses -->
                   <div class = "d-flex justify-content-between align-items-center">
                   <div class = "d-flex align-items-center">
                   <div class = "icon-md bg-success  p-2 pt-2 pb-2 bg-opacity-10 text-success rounded-circle flex-shrink-0"><i class = "fas fa-clock-four fa-fw" style = "font-size: 1.3rem;"></i></div>
                   <h6  class = "mb-0 ms-2 fw-light">${course.time}</h6>
                       </div>
                       <span class = "mb-0 fw-bold">4 Hours</span>
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
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user)
    {
        cartFeedback.textContent = 'Not authenticated. Please log in.'
        cartFeedback.classList.add('text-danger');
        cartFeedback.classList.remove("visually-hidden")
        $("#loginModal").modal('show')
    }
    document.getElementById('loader').innerHTML = load
    const                   code                = document.getElementById('code').value;
    const                   courseDetails       = await course
    await applyCoupon(Id, code, courseDetails, user.email)
})

const getAllCourseFAQs = async(course) =>{
    const id         = course[0].courseId;
    const faqs       = await GetAllCourseFAQs(id);
    const faqsHolder = document.getElementById('topics')
    if (faqs.length === 0) {
        faqsHolder.innerHTML += await feedback("No FAQs Provided for this course.");
    }
    for (let i = 0; i < faqs.length; i++) {
        let cId = crypto.randomUUID();
        var faq = `
            <!-- Item -->
            <div    class = "accordion-item">
            <h2     class = "accordion-header" id= "headingOne">
            <button class = "accordion-button collapsed  bg-dark-subtle" type = "button" data-bs-toggle = "collapse" data-bs-target = "#${cId}" aria-expanded = "true" aria-controls = "${cId}">
            <span   class = "text-secondary fw-bold me-3">${i + 1}</span>
            <span   class = "h6 mb-0">${faqs[i].question}</span>
                    </button>
                </h2>
                <div id    = "${cId}" class = "accordion-collapse collapse" aria-labelledby = "headingOne" data-bs-parent = "#accordionExample">
                <div class = "accordion-body pt-0">
                        ${faqs[i].answer}
                    </div>
                </div>
            </div>
        `;
    
        faqsHolder.innerHTML += faq;
          // Remove the "show" class from the second item onwards
        if (i > 1) {
            const accordionItem = faqsHolder.querySelector('.accordion-item:last-child');
            const collapseDiv   = accordionItem.querySelector('.accordion-collapse');
            collapseDiv.classList.remove('show');
        }
    }
}

document.getElementById('submit').addEventListener('click', async () => {
    document.getElementById('reviewLoader').innerHTML = loaderBtn
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user)
    {
        cartFeedback.textContent = 'Not authenticated. Please log in.';
        cartFeedback.classList.add('text-danger');
        cartFeedback.classList.remove("visually-hidden");
        $("#loginModal").modal('show');
    };

    const review = {
        name    : document.getElementById('name').value,
        email   : document.getElementById('email').value,
        rating  : document.getElementById('rating').value,
        review  : document.getElementById('review').value,
        courseId: Id,
        userId  : user.uid
    };
    await PostReview(review);
    getAllCourseReviews(Id);
    const reviewsHolder = document.getElementById('reviews').innerHTML = ''
    document.getElementById('reviewLoader').innerHTML = ''

    document.getElementById('name').value = ''
    document.getElementById('email').value = ''
    document.getElementById('rating').value = ''
    document.getElementById('review').value = ''
});

const getAllCourseReviews = async (Id) => {
    const reviewsHolder = document.getElementById('reviews')
    const reviews = await GetAllCourseReviews(Id)

    if(reviews.length <= 0)
    {
        reviewsHolder.innerHTML = await feedback("No Reviews For this Course")
    }

    document.getElementById('reviewsNo').textContent = reviews.length
    document.getElementById('reviewStar').innerHTML = await checkCourseTotalRatings(reviews.length)
    reviews.slice(0, 10).map(async (review) => {
        const reviewer = await GetUserDetailsById(review.userId);
        const rating = await checkUserRating(await review.rating);
        const replies = await GetReviewReplies(review.id);
        const date = review.postedAt.toDate().toDateString();
    
        const reply = 
        `
            <!-- Comment children level 1 -->
            <div class="d-md-flex mb-4 ps-md-5 ps-5">
                <!-- Avatar -->
                <div class="avatar avatar-xs flex-shrink-0">
                    <a href=""><img class="avatar-img rounded-circle" src="/assets/images/09.jpg" alt="avatar" width="50" height="50" style="object-fit: cover;"> </a>
                </div>
                <!-- Text -->
                <div class="ps-3">
                    <div class="d-sm-flex mt-1 mt-md-0 align-items-center">
                        <h5 class="me-3 mb-0 text-white fw-bolder">Louis Ferguson</h5>
                    </div>
                    <!-- Info -->
                    <p class="small mb-2">1 days ago</p>
                    <p class="mb-2">Water timed folly right aware if oh truth. Imprudence attachment him for sympathize. Large above be to means. Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected admiration everything.</p>
                </div>
            </div>
        `;
      
        var reviewHtml = 
        `
        <!-- Review item START -->
        <div class="d-md-flex my-4">
            <!-- Avatar -->
            <div class="avatar avatar-xs flex-shrink-0">
                <a href='/user/userDetails.html?id=${reviewer.id}'><img class="avatar-img rounded-circle" src=${reviewer.photo} alt="avatar" width="70" height="70" style="object-fit: cover;"> </a>
            </div>
            <!-- Text -->
            <div class="ps-3 mt-2">
                <div class="d-sm-flex mt-1 mt-md-0 align-items-center">
                    <h5 class="me-3 mb-0 text-white fw-bolder">${reviewer.Name} ${reviewer.Surname}</h5>
                    <!-- Review star -->
                    <ul class="list-inline mb-0">
                        ${rating}
                    </ul>
                </div>
                <!-- Info -->
                <p class="small mb-2">${date}</p>
                <p class="mb-2">${review.review} </p>
                <!-- Like and dislike button -->
                <div class="btn-group visually-hidden" role="group" aria-label="Basic radio toggle button group">
                    <!-- Like button -->
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1">
                    <label class="btn btn-outline-secondary btn-sm mb-0" for="btnradio1"><i class="far fa-thumbs-up me-1"></i>25</label>
                    <!-- Dislike button -->
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2">
                    <label class="btn btn-outline-secondary btn-sm mb-0" for="btnradio2"> <i class="far fa-thumbs-down me-1"></i>2</label>
                </div>
            </div>
        </div>
    
        ${replies.length > 0 ? reply : ''}
        
        <!-- Divider -->
        <hr>
        <!-- Review item END -->
        `;
        reviewsHolder.innerHTML += reviewHtml;
    });
    
}


document.getElementById('commentBtn').addEventListener('click', async () => {
    document.getElementById('commentLoader').innerHTML = loaderBtn
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user)
    {
        cartFeedback.textContent = 'Not authenticated. Please log in.';
        cartFeedback.classList.add('text-danger');
        cartFeedback.classList.remove("visually-hidden");
        $("#loginModal").modal('show');
    };

    const comment = {
        comment    : document.getElementById('comment').value,
        courseId: Id,
        userId  : user.uid
    };
    await PostComment(comment);
    document.getElementById('comments').innerHTML = ''
    await getAllCourseComments(Id)
    document.getElementById('commentLoader').innerHTML = ''
});

const getAllCourseComments = async (Id) => {
    const commentsHolder = document.getElementById('comments')
    const comments = await GetAllCourseComments(Id)

    if(comments.length <= 0)
    {
        commentsHolder.innerHTML = await feedback("No Comments For this Course")
    }
    comments.slice(0, 10).map(async (comment) => {
        const commenter = await GetUserDetailsById(comment.userId);
        const date = comment.postedAt.toDate().toDateString();
        const replies = await GetCommentReplies(comment.id);
        let replier = '', rep = '', repliedDate = '';
        if(replies.length > 0)
        {
            replier =  await GetUserDetailsById(replies[0].userId);
            rep = replies[0].reply
            repliedDate = replies[0].repliedAt.toDate().toDateString();
        }
        const reply = 
        `
            <!-- Comment item nested START -->
            <ul class="list-unstyled ms-4">
                <!-- Comment item START -->
                <li class="comment-item">
                    <div class="d-flex">
                        <!-- Avatar -->
                        <div class="avatar avatar-xs flex-shrink-0">
                            <a href=""><img class="avatar-img rounded-circle" src=${replier.photo} alt="avatar" width="40" height="40" style="object-fit: cover;"> </a>
                        </div>
                        <!-- Comment by -->
                        <div class="ms-2">
                            <div class="bg-dark-subtle p-3 rounded">
                                <div class="d-flex justify-content-center">
                                    <div class="me-2">
                                        <h6 class="mb-1  lead "> <a href="#" class=" text-white fw-bold text-decoration-none fw-bold">${replier.Name} ${replier.Surname} </a> </h6>
                                        <p class=" mb-0">${rep}</p>
                                    </div>
                                    <small>${repliedDate}</small>
                                </div>
                            </div>
                            <!-- Comment react -->
                            <ul class="nav nav-divider py-2 small visually-hidden">
                                <li class="nav-item pe-2"> <a class="text-primary-hover fw-bold text-decoration-none" href="#"> Like (3)</a> </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <!-- Comment item END -->
            </ul>
            <!-- Comment item nested END -->
        `;
        const commentHtml = 
        `
        <!-- Comment item START -->
        <div class="border p-2 p-sm-4 rounded-3 mb-4">
            <ul class="list-unstyled mb-0">
                <li class="comment-item">
                    <div class="d-flex mb-3">
                        <!-- Avatar -->
                        <div class="avatar avatar-xs flex-shrink-0">
                            <a href=""><img class="avatar-img rounded-circle" src=${commenter.photo} alt="avatar" width="40" height="40" style="object-fit: cover;"> </a>
                        </div>
                        <div class="ms-2">
                            <!-- Comment by -->
                            <div class="bg-dark-subtle p-3 rounded w-100">
                                <div class="d-flex justify-content-center">
                                    <div class="me-2 w-100">
                                        <h6 class="lead fw-bold text-white mb-2"> <a href="#!" class="text-white text-decoration-none"> ${commenter.Name} ${commenter.Surname}</a></h6>
                                        <p class="mb-0 w-100">${comment.comment}</p>
                                    </div>
                                    <small>${date}</small>
                                </div>
                            </div>
                            <!-- Comment react -->
                            <ul class="nav nav-divider py-2 small">
                                <li class="nav-item pe-2"> <a class="text-primary-hover fw-bold text-decoration-none" href="#"> Like <span id="likes"></span></a> </li>
                                <li class="nav-item pe-2"> <a class="text-primary-hover fw-bold text-decoration-none" id="showReply" style="cursor: pointer;"> Reply</a> </li>
                            </ul>
                        </div>
                    </div>
                    <div class="d-flex mb-4 container visually-hidden" id="replyBox">
                        <!-- Avatar -->
                        <div class="avatar avatar-sm flex-shrink-0 me-2">
                            <a href="#"> <img class="avatar-img rounded-circle" src="" alt=""> </a>
                        </div>

                        <form class="w-100 d-flex">
                            <textarea class="one form-control pe-4 bg-dark" id="autoheighttextarea" rows="1" placeholder="Add a reply..."></textarea>
                            <button class="btn bg-primary bg-opacity-25 text-primary ms-2 mb-0" type="button"><i class="fas fa-paper-plane fs-5"></i></button>
                        </form>
                    </div>
                    ${replies.length > 0 ? reply : ''}
                </li>
            </ul>
        </div>
        <!-- Comment item END -->
        `
        commentsHolder.innerHTML += commentHtml
        document.getElementById('likes').textContent = `(${comment.likes.length})`
        document.getElementById('showReply').addEventListener('click', () => {
            document.getElementById('replyBox').classList.remove('visually-hidden')
        })

    });
    return comments
}

const getAllCourseLearnings = async (Id) => {
    const learningsHolder = document.getElementById('learnings')
    const learnings = await GetAllCourseLearnings(Id)

    if(learnings.length <= 0)
    {
        learningsHolder.innerHTML = await feedback("No learnings For this Course")
    }
    learnings.map(async (learning) => {

        const learningHtml = 
        `
            <li class="list-group-item h6 fw-light d-flex mb-0 border-0"><i class="fas fa-check-circle text-success me-2"></i>${learning.learn}</li>
        `
        learningsHolder.innerHTML += learningHtml
    });
}

getAllCourseLearnings(Id)
getAllCourseFAQs(course)
getCourseDetailsById (course)
OnGet()
getAllCourseReviews(Id)
getAllCourseComments (Id)