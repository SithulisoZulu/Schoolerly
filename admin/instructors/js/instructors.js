import { GetAllCourseByInstructorId } from "../../../controllers/course.js";
import { GetAllInstructors } from "../../../controllers/instructor.js";


const loadInstructorsToCards = async () => {
    const Instructors = document.getElementById('instructors')
    const allInstructors =  await getAllInstructors();
    allInstructors.forEach(loadInstructors)
    async function loadInstructors(instructor)
    {
        const allCourses =  await GetAllCourseByInstructorId(instructor.id)
        const courses =  allCourses.length
        const instructorCard = 
        `
            <!-- Card item START -->
            <div class="col-md-6 col-xxl-4">
                <div class="card bg-transparent border h-100"> 
                    <!-- Card header -->
                    <div class="card-header bg-transparent border-bottom d-flex align-items-sm-center justify-content-between">
                        <div class="d-sm-flex align-items-center">
                            <!-- Avatar -->
                            <div class="avatar avatar-md flex-shrink-0">
                                <img class="avatar-img rounded-circle" src="${instructor.photo}" alt=avatar" width="50" height="50" style="object-fit: cover;"> 
                            </div>
                            <!-- Info -->
                            <div class="ms-0 ms-sm-2 mt-2 mt-sm-0">
                                <h5 class="mb-2" style="padding-left: 7px; font-weight:700;" ><a id="${instructor.id}"  class="text-white text-decoration-none viewInstructorDetails" style="cursor: pointer;" >${instructor.Name} ${instructor.Surname}</a></h5>
                                <p class="mb-0 small" style="padding-left: 8px;">${instructor.Address}</p>
                            </div>
                        </div>
        
                        <!-- Edit dropdown -->
                        <div class="dropdown">
                            <a href="#" class="btn btn-sm bg-dark  small mb-0" role="button" id="dropdownShare1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-three-dots fa-fw fa-2" ></i>
                            </a>
                            <!-- dropdown button -->
                            <ul class="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare1">
                                <li style="cursor: pointer;"><a class="dropdown-item viewInstructorDetails" id="${instructor.id}"><i class="bi bi-eye fa-fw me-2"></i>View Details</a></li>
                                <li style="cursor: pointer;"><a class="dropdown-item" id="${instructor.id}"><i class="bi bi-pencil-square fa-fw me-2"></i>Edit</a></li>
                            </ul>
                        </div>
                    </div>
        
                    <div class="card-body">
                        <!-- Total students -->
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="d-flex align-items-center">
                                <div class="icon-md bg-warning bg-opacity-10 text-warning p-2 pt-2 pb-2 rounded-circle flex-shrink-0"><i class="fas fa-user-graduate fa-fw" style="font-size: 1.3rem;"></i></div>
                                <h6 class="mb-0 ms-2 fw-light">Total Students</h6>
                            </div>
                            <span class="mb-0 fw-bold">5,354</span>
                        </div>
        
                        <!-- Total courses -->
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <div class="icon-md bg-success  p-2 pt-2 pb-2 bg-opacity-10 text-success rounded-circle flex-shrink-0"><i class="fas fa-book fa-fw" style="font-size: 1.3rem;"></i></div>
                                <h6 class="mb-0 ms-2 fw-light">Total Courses</h6>
                            </div>
                            <span class="mb-0 fw-bold">${courses}</span>
                        </div>
                    </div>
        
                    <!-- Card footer -->
                    <div class="card-footer bg-transparent border-top">
                        <div class="d-flex justify-content-between align-items-center">
                            <!-- Rating star -->
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                                <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                                <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                                <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                                <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
                            </ul>
                            <!-- Message button -->
                            <a href="mailTo:${instructor.email}"><i class="bi bi-envelope-fill"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Card item END -->
        `
        Instructors.innerHTML += instructorCard;
    }
}

const loadInstructorsToTable = async () => {
    //const res = await fetch('http://localhost:8000/api/v1/admin/instructors');
    const Instructors = document.getElementById('table')
    const allInstructors =  await getAllInstructors();
    allInstructors.forEach(loadInstructors)
    async function loadInstructors(instructor)
    {
        const allCourses =  await GetAllCourseByInstructorId(instructor.id)
        const courses =  allCourses.length
        const instructorTableRow = 
        `
        <!-- Table row -->
        <tr>
            <!-- Table data -->
            <td>
                <div class="d-flex align-items-center position-relative">
                    <!-- Image -->
                    <div class="avatar avatar-md">
                        <img class="avatar-img rounded-circle" src="${instructor.photo}" alt="avatar" width="40" height="40" style="object-fit: cover;"> 
                    </div>
                    <div class="mb-0 ms-2">
                        <!-- Title -->
                        <h6 class="mb-0" style="padding-left: 7px; font-weight:700;"><a id="${instructor.id}" class="stretched-link text-white text-decoration-none viewInstructorDetails" style="cursor: pointer;">${instructor.Name} ${instructor.Surname}</a></h6>
                    </div>
                </div>
            </td>

            <!-- Table data -->
            <td class="text-center text-sm-start">
                <p class="mb-0">${instructor.Address}</p>
            </td>

            <!-- Table data -->
            <td>${courses}</td>

            <!-- Table data -->
            <td>5,354</td>

            <!-- Table data -->
            <td>
                <a href="mailTo:${instructor.email}" class="btn bg-info bg-opacity-25 me-1 mb-1 mb-md-0" >
                    <i class="bi bi-envelope"></i>
                </a>
                <a href="#" class="btn bg-success bg-opacity-25 me-1 mb-1 mb-md-0" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit" data-bs-original-title="Edit">
                    <i class="bi bi-pencil-square"></i>
                </a>
                <button class="btn bg-primary bg-opacity-25 mb-0 viewInstructorDetails" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="view details" data-bs-original-title="view details" id="${instructor.id}"">
                    <i class="bi bi-eye viewInstructorDetails" id="${instructor.id}"></i>
                </button>
            </td>
        </tr> 
        `
        Instructors.innerHTML += instructorTableRow;
    }
}
const getAllInstructors = async () => {
    const allInstructors =  await GetAllInstructors()
   return allInstructors
}

//View Instructor Details
document.addEventListener('click', function (e)  {
    if (e.target.classList.contains('viewInstructorDetails')) {
        const courseInstructor = e.target.id
        var url = `/admin/instructors/instructor-details.html?id=${encodeURIComponent(courseInstructor)}`;
        window.location.href = url;
    }
});

const OnGet = async () => {
    await loadInstructorsToCards();
    await loadInstructorsToTable();
}

OnGet()