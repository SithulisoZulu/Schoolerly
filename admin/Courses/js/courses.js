import { GetAllCourses, GetCourseLevelById } from "../../../controllers/course.js";
import { GetInstructorById } from "../../../controllers/user.js";
import courseStatues from "../../../libraries/courseStatuses.js";
import { courseLevel } from "../../../utils/checkCourseLevel.js";
import { checkStatus } from "../../../utils/checkStatus.js";

const getAllCourses = async () => {
    var tableData = document.getElementById("tableData");
    const allCourses =  await GetAllCourses();
    allCourses.forEach(loadCourses)
    async function loadCourses(course) {
        const courseInstructor = await GetInstructorById(course.userId)
        const levels = await GetCourseLevelById(course.level)
        const date = course.creationDate.toDate().toDateString();

        const status = await checkStatus(course.status);
        const level = await courseLevel(levels.name)
        var courseData = 
        `
            <tr>
                <!-- Table data -->
                <td>
                    <div class="d-flex align-items-center position-relative">
                        <!-- Image -->
                        <div class="w-60px">
                            <div class="w-60px"><img src="${course.photo}" class="rounded" alt="" width="60" height="40" style="object-fit: cover;"></div>
                        </div>
                        <!-- Title -->
                        <h6 class="table-responsive-title mb-0 ms-2" style="padding-left: 7px; font-weight:700;">	
                            <a  class="stretched-link text-white text-decoration-none viewCourseDetails" id="${course.courseId}" style="cursor: pointer;">${course.title}</a>
                        </h6>
                    </div>
                </td>
        
                <!-- Table data -->
                <td>
                    <div class="d-flex align-items-center mb-3 mt-2">
                        <!-- Avatar -->
                        <div class="avatar avatar-xs flex-shrink-0">
                            <img class="avatar-img rounded-circle" src="${courseInstructor.photo}" alt="avatar" width="40" height="40" style="object-fit: cover;"> 
                        </div>
                        <!-- Info -->
                        <div class="ms-2">
                            <h6 class="mb-0 fw-light text-white " style="padding-left: 7px;">${courseInstructor.Name} ${courseInstructor.Surname}</h6>
                        </div>
                    </div>
                </td>
        
                <!-- Table data -->
                <td>${date}</td>

                <!-- Table data -->
                <td> ${level}</td>

                <!-- Table data -->
                <td>R ${course.price}</td>

                <!-- Table data -->
                <td> ${status}</td>
        
                <!-- Table data -->
                <td class="visually-hidden">
                    <a href="#" class="btn btn-sm bg-success bg-opacity-25 me-1 mb-1 mb-md-0">Approve</a>
                    <button class="btn btn-sm bg-danger bg-opacity-25 mb-0">Reject</button>
                </td>
            </tr>
        `
        tableData.innerHTML += courseData;
    }
    document.getElementById('courseTotal').textContent = allCourses.length
 
    const count = allCourses.filter(course => {
        if (course.status === courseStatues.Live) {
            return true;
        }
        
        return false;
    }).length;
    document.getElementById('liveCourse').textContent = count


    const pendingCourses = allCourses.filter(course => {
        if (course.status === courseStatues.Pending) {
            return true;
        }
        return false;
    }).length;
    document.getElementById('pendingCourse').textContent = pendingCourses
}


//View Instructor Details
document.addEventListener('click', function (e)  {
    if (e.target.classList.contains('viewCourseDetails')) {
        const courseInstructor = e.target.id
        var url = `/admin/Courses/course-details.html?id=${encodeURIComponent(courseInstructor)}`;
        window.location.href=url;
    }
});


const OnGet = async => {
    getAllCourses()
}

OnGet()