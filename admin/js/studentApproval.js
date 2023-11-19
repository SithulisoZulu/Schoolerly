import { ApproveCourse, GetAllCoursesPendingApproval, GetApplicationDetailsByApplicationId, GetCourseDocIdByCorseId, RejectCourse } from "../../controllers/course.js"
import { openModal } from "../../components/courseDetailsForApprovalsModal.js";
import { GetInstructorById } from "../../controllers/user.js";
import { loader, loaderBtn } from "../../components/loading.js";
import { ApprovedStudentApplication, GetAllStudentApplicationsPendingApproval, GetStudentApplicationById, GetStudentEmergenceContactInfoByStudentId, RejectStudentApplication } from "../../controllers/applicationController.js";

const load =  loaderBtn
const getAllStudentApplicationsPendingApproval = async () => {
    const allStudentApplications = await GetAllStudentApplicationsPendingApproval();
    var tableData = document.getElementById("tableData");
    var noInfo = document.getElementById("noInfo");
    tableData.innerHTML = ""
    for(let i = 0; i < allStudentApplications.length; i++) 
    {      

        const date = allStudentApplications[i].submittedDate.toDate().toDateString();
        var course = 
        `
            <!-- Table row -->
            <tr>
                <!-- Table data -->
                <td>
                    <div class="d-flex align-items-center position-relative">
                        <div class="mb-0 ms-2">
                            <!-- Title -->
                            <h6 class="mb-0" style="padding-left: 7px; font-weight:700;"><a href="/admin/students/student-Details.html?id=${encodeURIComponent(allStudentApplications[i].studentId)}" id="${allStudentApplications.studentId}" class="stretched-link text-white text-decoration-none viewInstructorDetails" style="cursor: pointer;">${allStudentApplications[i].studentFirstName} ${allStudentApplications[i].studentMiddleName } ${allStudentApplications[i].studentLastName}</a></h6>
                        </div>
                    </div>
                </td>

                <!-- Table data -->
                <td class="text-center text-sm-start">
                    <div class="d-flex align-items-center position-relative">

                        <div class="mb-0 ms-2">
                            <!-- Title -->
                           ${date}
                        </div>
                    </div>
                </td>

                <!-- Table data -->
                <td class="text-center text-sm-start">
                    <h6 class="mb-0 badge bg-warning bg-opacity-10 text-warning p-2" style="font-weight: 600;">${allStudentApplications[i].status}</h6>
                </td>

                <!-- Table data -->
                <td class="col-4">
                    <a  class="btn bg-success bg-opacity-10 me-1 mb-1 mb-lg-0 text-success-emphasis approveCourse" id="${allStudentApplications[i].id}">Approve <span id="approveLoader"></span><i class="fa-solid fa-thumbs-up fa-fw me-2"></i></a>
                    <a  class="btn bg-danger bg-opacity-10 text-danger-emphasis me-1 mb-1 mb-lg-0 rejectApplication" id="${allStudentApplications[i].id}">Reject <span id="rejectLoader"></span><i class="fa-solid fa-trash fa-fw me-2"></i></a>
                    <a class="btn bg-primary text-primary-emphasis bg-opacity-10 me-1 mb-0 mb-lg-0 viewApplication" id="${allStudentApplications[i].id}">View Details <span id="loader"></span></a>
                </td>
            </tr>
        `
        tableData.innerHTML += course;
    }
    document.getElementById('pendingNo').textContent = allStudentApplications.length > 0 ? allStudentApplications.length : 0;
    document.getElementById("approvals").textContent = allStudentApplications.length;
    if(allStudentApplications.length <= 0)
    {
        var noCourse = 
        `
            <div class="card border bg-transparent rounded-3 mt-5 mb-5 text-white-50 w-100" id="noCourses">
                There are no Student Applications  pending approval                                                                                                                  
            </div>
        `
        noInfo.innerHTML += noCourse
    }
}

document.addEventListener('click', async function(e) {
    if (e.target.classList.contains('viewApplication')) {
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
            const ApplicationId = e.target.id
            await viewApplicationDetails(ApplicationId)
        } catch (error) {

        } finally {
            // Remove the loader and enable the button
            button.removeChild(loader);
            button.disabled = false;
        }
    }
});

const viewApplicationDetails = async (Id) => {
    const application = await GetStudentApplicationById(Id)
    const emergenceContactInformation = await GetStudentEmergenceContactInfoByStudentId(application.studentId)
    console.log(emergenceContactInformation)
    const modalHolder = document.getElementById("modal")
    const body = 
    `
        <div class=""  >
            <!-- Name -->
            <span class="small">Applicant Name:</span>
            <h6 class="mb-3" style="font-weight:700"><a href="/admin/students/student-Details.html?id=${application.studentId} ">${application.studentFirstName} ${application.studentLastName}</a></h6>

            <!-- Email -->
            <span class="small">Applicant Email:</span>
            <h6 class="mb-3" style="font-weight:700"><a href="mailTo:${application.studentEmail}">${application.studentEmail}</a></h6>

            <!-- Phone number -->
            <span class="small">Applicant Phone number:</span>
            <h6 class="mb-3" style="font-weight:700">${application.studentPhoneNumber}</h6>


        </div>
    ` 
    const modal = await openModal(body, application.id)
    modalHolder.innerHTML = modal
    $("#applicationDetailsModal").modal('show')

    return application
}

//Reject Course
document.addEventListener('click', async function   (e)  {
    if (e.target.classList.contains('rejectApplication')) {
        const button = e.target;
        const loader = document.createElement('span');
        loader.innerHTML = load;
        loader.classList.add('loader');

        // Append the loader inside the button
        button.appendChild(loader);

        const id = button.id;
        
        // Disable the button while processing
        button.disabled = true;

        const ApplicationId = e.target.id
        try {
            await rejectStudentApplication(ApplicationId)
        } catch (error) {

        } finally {
            // Remove the loader and enable the button
            button.removeChild(loader);
            button.disabled = false;
        }
    }
});
const rejectStudentApplication = async (ApplicationId) =>
{
    await RejectStudentApplication(ApplicationId)
    getAllStudentApplicationsPendingApproval();
}

//Approve Course
document.addEventListener('click', async function (e)  {
    if (e.target.classList.contains('approveCourse')) {
        const button = e.target;
        const loader = document.createElement('span');
        loader.innerHTML = load;
        loader.classList.add('loader');

        // Append the loader inside the button
        button.appendChild(loader);

        const id = button.id;
        
        // Disable the button while processing
        button.disabled = true;

        const applicationId = e.target.id
        try {
            await approvedStudentApplication(applicationId)
        } catch (error) {
            console.error('An error occurred while deleting the coupon:', error);
        } finally {
            // Remove the loader and enable the button
            button.removeChild(loader);
            button.disabled = false;
        }
    }
});
const approvedStudentApplication = async (applicationId) =>{
    await ApprovedStudentApplication(applicationId)
    getAllStudentApplicationsPendingApproval();
}

const OnGet = async => {
    getAllStudentApplicationsPendingApproval();
}

OnGet()