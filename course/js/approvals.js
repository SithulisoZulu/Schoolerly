import { ApproveCourse, GetAllCoursesPendingApproval, GetApplicationDetailsByApplicationId, GetCourseDocIdByCorseId, RejectCourse } from "../../../controllers/course.js"
import { openModal } from "../../../components/courseDetailsForApprovalsModal.js";
import { GetInstructorById } from "../../../controllers/user.js";
import { loader, loaderBtn } from "../../components/loading.js";

const load =  loaderBtn
const getAllCoursesPendingApproval = async () => {
    const allCourse = await GetAllCoursesPendingApproval();
    var tableData = document.getElementById("tableData");
    var noInfo = document.getElementById("noInfo");
    tableData.innerHTML = ""
    for(let i = 0; i < allCourse.length; i++) 
    {      
        const courseInstructor = await GetInstructorById(allCourse[i].userId)
        const date = allCourse[i].creationDate.toDate().toDateString();
        var course = 
        `
            <!-- Table row -->
            <tr>
                <!-- Table data -->
                <td>
                    <div class="d-flex align-items-center position-relative">
                        <!-- Image -->
                        <div class="avatar avatar-md">
                            <img class="avatar-img rounded-circle" src="${courseInstructor.photo}" alt="avatar" width="40" height="40" style="object-fit: cover;"> 
                        </div>
                        <div class="mb-0 ms-2">
                            <!-- Title -->
                            <h6 class="mb-0" style="padding-left: 7px; font-weight:700;"><a id="${courseInstructor.id}" class="stretched-link text-white text-decoration-none viewInstructorDetails" style="cursor: pointer;">${courseInstructor.Name} ${courseInstructor.Surname}</a></h6>
                        </div>
                    </div>
                </td>

                <!-- Table data -->
                <td class="text-center text-sm-start">
                    <div class="d-flex align-items-center position-relative">
                        <!-- Image -->
                        <div class="avatar avatar-md">
                        <img src="${allCourse[i].photo}" class="rounded" alt="" width="60" height="40" style="object-fit: cover;">
                        </div>
                        <div class="mb-0 ms-2">
                            <!-- Title -->
                            <h6 class="mb-0" style="padding-left: 7px; font-weight:700;">${allCourse[i].title}</h6>
                        </div>
                    </div>
                </td>

                <!-- Table data -->
                <td class="">${date}</td>

                <!-- Table data -->
                <td class="text-center text-sm-start">
                    <h6 class="mb-0 badge bg-warning bg-opacity-10 text-warning p-2" style="font-weight: 600;">${allCourse[i].status}</h6>
                </td>

                <!-- Table data -->
                <td class="col-3">
                    <a  class="btn bg-success bg-opacity-10 me-1 mb-1 mb-lg-0 text-success-emphasis approveCourse" id="${allCourse[i].courseId}">Approve <span id="approveLoader"></span><i class="fa-solid fa-thumbs-up fa-fw me-2"></i></a>
                    <a  class="btn bg-danger bg-opacity-10 text-danger-emphasis me-1 mb-1 mb-lg-0 rejectApplication" id="${allCourse[i].courseId}">Reject <span id="rejectLoader"></span><i class="fa-solid fa-trash fa-fw me-2"></i></a>
                    <a class="btn bg-primary text-primary-emphasis bg-opacity-10 me-1 mb-0 mb-lg-0 viewApplication" id="${allCourse[i].courseId}">View App <span id="loader"></span></a>
                </td>
            </tr>
        `
        tableData.innerHTML += course;
    }
    document.getElementById('pendingNo').textContent = allCourse.length > 0 ? allCourse.length : 0;
    document.getElementById("approvals").textContent = allCourse.length;
    if(allCourse.length <= 0)
    {
        var noCourse = 
        `
            <div class="card border bg-transparent rounded-3 mt-5 mb-5 text-white-50 w-100" id="noCourses">
                There are currently no courses pending approval                                                                                                                  
            </div>
        `
        noInfo.innerHTML += noCourse
    }
}

document.addEventListener('click', async function(e) {
    if (e.target.classList.contains('viewApplication')) {

        const ApplicationId = e.target.id
        document.getElementById('loader').innerHTML = load
        await viewApplicationDetails(ApplicationId)
        document.getElementById('loader').innerHTML = " "
    }
});

const viewApplicationDetails = async (Id) => {
    const applicationData = await GetApplicationDetailsByApplicationId(Id)
    const application = applicationData[0];
    const modalHolder = document.getElementById("modal")
    const courseInstructor = await GetInstructorById(application.userId)
    const body = 
    `
        <div class=""  >
            <!-- Name -->
            <span class="small">Applicant Name:</span>
            <h6 class="mb-3" style="font-weight:700">${courseInstructor.Name} ${courseInstructor.Surname}</h6>

            <!-- Email -->
            <span class="small">Applicant Email:</span>
            <h6 class="mb-3" style="font-weight:700"><a href="mailTo:${courseInstructor.email}">${courseInstructor.email}</a></h6>

            <!-- Phone number -->
            <span class="small">Applicant Phone number:</span>
            <h6 class="mb-3" style="font-weight:700">${courseInstructor.Contact}</h6>

            <h4>Course Details</h4>

            <!-- Title -->
            <span class="small">Course Title:</span>
            <h6 class="mb-3" style="font-weight:700">${application.title}</h6>

            <!-- Price -->
            <span class="small">Course Price:</span>
            <h6 class="mb-3" style="font-weight:700">R ${application.price}</h6>

            <!-- Description -->
            <span class="small mb-4">Description:</span>
            <p class="text-white mb-2 mt-2 text-light-emphasis">${application.longDescription}</p>

            <!-- Message -->
            <span class="small mb-4">Message:</span>
            <p class="text-white mb-2 mt-2 text-light-emphasis">${application.message}</p>
        </div>
    ` 
    const modal = await openModal(body, application.id)
    modalHolder.innerHTML = modal
    $("#applicationDetailsModal").modal('show')

    return application
}

//Reject Course
document.addEventListener('click', function (e)  {
    if (e.target.classList.contains('rejectApplication')) {
        const courseId = e.target.id
        RejectCourseById(courseId)
    }
});
const RejectCourseById = async (courseId) =>
{
    document.getElementById('rejectLoader').innerHTML = load
    const docId = await GetCourseDocIdByCorseId(courseId)
    await RejectCourse(docId)
    document.getElementById('rejectLoader').innerHTML = " "
    getAllCoursesPendingApproval();
}

//Approve Course
document.addEventListener('click', async function (e)  {
    document.getElementById('approveLoader').innerHTML = load
    if (e.target.classList.contains('approveCourse')) {
        const courseId = e.target.id
        await ApproveCourseById(courseId)
        document.getElementById('approveLoader').innerHTML = " "
    }
});
const ApproveCourseById = async (courseId) =>
{
    const docId = await GetCourseDocIdByCorseId(courseId)
    await ApproveCourse(docId)
    getAllCoursesPendingApproval();
}


//View Instructor Details
document.addEventListener('click', function (e)  {
    if (e.target.classList.contains('viewInstructorDetails')) {
        const courseInstructor = e.target.id
        var url = `/admin/instructors/instructor-details.html?id=${encodeURIComponent(courseInstructor)}`;
        window.location.href = url;
    }
});

const OnGet = async => {
    getAllCoursesPendingApproval()
}

OnGet()