import { GetAllCourseByInstructorId } from "../../../controllers/course.js";
import { GetInstructorById } from "../../../controllers/user.js";
import { getParameterByName } from '../../../security/getParameterByName.js';
import { checkStatus } from "../../../utils/checkStatus.js";

const Id = getParameterByName('id')

const getAllCourseByUserId = async (Id) => {
    const courses = await GetAllCourseByInstructorId(Id)
   
    var tableData = document.getElementById("tableData");
    tableData.innerHTML = "";
    for(let i = 0; i < courses.length; i++) {
        const date = courses[i].creationDate.toDate().toDateString();
        var photo;
        if(courses[i].photo === "undefined" || courses[i].photo === "")
        {
            photo = "/assets/images/01.jpg"
        }
        else{
            photo = courses[i].photo
        }
        const status = await checkStatus(courses[i].status)
        var course = 
        `
            <tr>
                 <!-- Course item -->
                <td>
                    <div class="d-flex align-items-center">
                        <!-- Image -->
                        <div class="w-60px">
                        <div class="w-60px"><img src="${photo}" class="rounded" alt="" width="60" height="40" style="object-fit: cover;"></div>
                    </div>
                    <div class="mb-0 ms-2">
                        <!-- Title -->
                        <h6  style="padding-left: 7px; font-weight:700;"><a  class="text-white text-decoration-none text-primary-hover" onclick="getId(div)" id="${courses[i].courseId}">${courses[i].title}</a></h6>
                        <!-- Info -->
                        <div class="d-sm-flex"style="padding-left: 7px;">
                            <p class="h6 fw-light mb-0 small"><i class="fas fa-check-circle text-success me-2"></i>${date}</p>
                            <p class="h6 fw-light mb-0 small me-3 visually-hidden"><i class="fas fa-table text-warning me-2"></i>18 lectures</p>
                        </div>
                    </div>
                
                </td>
                <!-- Enrolled item -->
                <td class="text-center text-sm-start">${courses[i].enrolled}</td>
                <!-- Status item -->
                <td id="status">
                    ${status}
                </td>
                <!-- Price item -->
                <td>R ${courses[i].price}</td>
                <!-- Action item -->
                <td>
                    <a class="btn bg-primary text-primary-emphasis bg-opacity-10 me-1 mb-0 mb-lg-0 vieCourseDetails" id="${courses[i].courseId}">View Course <i class="far fa-fw fa-eye"></i></a>
                </td>
            </tr>

        `

        tableData.innerHTML += course;
    }
    if(courses.length > 0)
    {
        document.getElementById("noCourses").classList.add("visually-hidden");
    }
}

//View Instructor Details
document.addEventListener('click', function (e)  {
    if (e.target.classList.contains('vieCourseDetails')) {
        const courseInstructor = e.target.id
        var url = `/course/course-details.html?id=${encodeURIComponent(courseInstructor)}`;
        window.location.href=url;
    }
});


const OnGet = async(Id) => {

    const instructor = await GetInstructorById(Id)
    getAllCourseByUserId(Id)
    var image = document.getElementById('photo');
    var photo
    if(instructor.photo === "undefined" || instructor.photo === "")
    {
        photo = "/assets/images/01.jpg"
    }
    else{
        photo = instructor.photo
    }
    image.src = photo
    const date = instructor.creationDate.toDate().toDateString();
    document.getElementById('fullName').textContent = instructor.Name + " " + instructor.Surname
    document.getElementById('role').textContent = instructor.Role
    document.getElementById('contact').textContent = instructor.Contact
    document.getElementById('email').textContent = instructor.email
    document.getElementById('location').textContent = instructor.Address
    document.getElementById('joined').textContent = date
    document.getElementById('about').textContent = instructor.About
}

OnGet(Id)