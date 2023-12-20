import { feedback } from "../../components/notFound.js";
import { DeleteCourse, GetAllCourseByUserId, GetAllInstructorMostSellingCourses } from "../../controllers/course.js"

const getAllCourseByUserId = async () => {
    const courses = await GetAllInstructorMostSellingCourses();
    const tableData = document.getElementById("tableData");
    const coursesData = document.getElementById("noCourses");
    const paginationContainer = document.getElementById("paginationContainer");

    document.getElementById("courses").innerHTML = courses.length;


    // Filter and sort courses with more than 50 enrolled students
    const filteredCourses = courses
        .filter(course => course.enrolled >= 50)
        .slice(0, 100); // Get the top 100 courses

    if (filteredCourses.length <= 0) {
        coursesData.innerHTML += await feedback("No Courses Found!");
        return;
    }

    const itemsPerPage = 8;
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    let currentPage = 1;

    // Pagination
    if (totalPages > 1) {
        paginationContainer.classList.remove("visually-hidden");
        paginationContainer.innerHTML = generatePagination(currentPage, totalPages);

        // Event listener for pagination clicks
        paginationContainer.addEventListener("click", (event) => {
            if (event.target.tagName === "A") {
                event.preventDefault();
                currentPage = parseInt(event.target.textContent);
                getAllCourseByUserId(currentPage);
            }
        });
    } else {
        paginationContainer.classList.add("visually-hidden");
    }

    // Update the total number of courses
    document.getElementById('numCourses').textContent = courses.length;

    // Initialize a variable to store the sum
    let totalEnrolled = 0;

    // Loop through the courses array and calculate the sum of enrolled
    courses.forEach(course => {
        // Assuming each course object has an "enrolled" property
        if (course.enrolled) {
            totalEnrolled += course.enrolled;
        }
    });

    if (totalEnrolled >= 1000) {
        totalEnrolled = totalEnrolled + "K";
    }

    document.getElementById('enrolledStudents').textContent = totalEnrolled;

    // Display courses based on pagination
    displayCourses(filteredCourses, tableData, currentPage, itemsPerPage);
}

// Helper function to display courses based on pagination
function displayCourses(filteredCourses, tableData, currentPage, itemsPerPage) {
    tableData.innerHTML = "";

    for (let i = (currentPage - 1) * itemsPerPage; i < currentPage * itemsPerPage && i < filteredCourses.length; i++) {
        // ... (your existing code for creating the 'course' HTML)
        var photo;
        if(filteredCourses[i].photo === "undefined" || filteredCourses[i].photo === "")
        {
            photo = "/assets/images/01.jpg"
        }
        else{
            photo = filteredCourses[i].photo
        }
        var course = 
        `
            <tr>
                <!-- Course item -->
                <td>
                    <div class="d-flex align-items-center position-relative">
                        <!-- Image -->
                        <div class="w-60px">
                            <div class="w-60px"><img src="${photo}" class="rounded" alt="" width="60" height="40" style="object-fit: cover;"></div>
                        </div>
                        <!-- Title -->
                        <h6 class="table-responsive-title mb-0 ms-2" style="padding-left: 7px; font-weight:700;">	
                            <a href="#" class="stretched-link  text-decoration-none">${filteredCourses[i].title}</a>
                        </h6>
                    </div>
                </td>
                <!-- Selling item -->
                <td>${filteredCourses[i].enrolled}</td>
                <!-- Amount item -->
                <td>R ${filteredCourses[i].price}</td>
                <!-- Period item -->
                <td>
                    ${filteredCourses[i].time}
                </td>
                <!-- Action item -->
                <td>
                    <a  class="btn btn-sm bg-success bg-opacity-10 text-success btn-round me-1 mb-0 viewCourse" id="${filteredCourses[i].courseId}"><i class="far fa-fw fa-edit viewCourse" id="${filteredCourses[i].courseId}"></i></a>
                    <a class="btn btn-sm bg-danger bg-opacity-10 text-danger btn-round mb-0 deleteCourse" id="${filteredCourses[i].courseId}"><i class="fas fa-fw fa-times deleteCourse" id="${filteredCourses[i].courseId}"></i></a>
                </td>
            </tr>

        `
        tableData.innerHTML += course;
    }

    if (filteredCourses.length > 0) {
        document.getElementById("noCourses").classList.add("visually-hidden");
    }
}

// Helper function to generate pagination HTML
function generatePagination(currentPage, totalPages) {
    let paginationHTML = `
        <div class="d-sm-flex justify-content-sm-between align-items-sm-center mt-3">
            <p class="mb-0 text-center text-sm-start">Showing ${currentPage * 8 - 7} to ${Math.min(currentPage * 8, totalPages * 8)} of ${totalPages * 8} entries</p>
            <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
                <ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                    <li class="page-item mb-0"><a class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-left"></i></a></li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<li class="page-item mb-0 ${currentPage === i ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
    }

    paginationHTML += `
                    <li class="page-item mb-0"><a class="page-link" href="#"><i class="fas fa-angle-right"></i></a></li>
                </ul>
            </nav>
        </div>`;

    return paginationHTML;
}


getAllCourseByUserId()

//View Course Details
document.addEventListener('click', function (e)  {
    if(e.target.classList.contains('viewCourse')) {
        const categoryId = e.target.id
        var url = `/course/edit-course-details.html?id=${encodeURIComponent(categoryId)}`;
        window.location.href=url;
    }
    
});

//Delete  Course
document.addEventListener('click', async function (e)  {
    if(e.target.classList.contains('deleteCourse')) {
        const courseId = e.target.id
        await DeleteCourse(courseId)
        getAllCourseByUserId()
    }
});
