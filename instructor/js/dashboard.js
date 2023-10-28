import { DeleteCourse, GetAllCourseByUserId, GetAllInstructorMostSellingCourses } from "../../controllers/course.js"

const getAllCourseByUserId = async () => {
    const courses = await GetAllInstructorMostSellingCourses();
    var tableData = document.getElementById("tableData");
    tableData.innerHTML = "";
    document.getElementById("courses").innerHTML = courses.length
    // Filter and sort courses with more than 50 enrolled students
    const filteredCourses = courses
        .filter(course => course.enrolled >= 50)
        .slice(0, 10); // Get the top 10 courses

    for (let i = 0; i < filteredCourses.length; i++) {
        // ... (your existing code for creating the 'course' HTML)
        // You can access course details using 'filteredCourses[i]' in this loop.
        var photo;
        if(courses[i].photo === "undefined" || courses[i].photo === "")
        {
            photo = "/assets/images/01.jpg"
        }
        else{
            photo = courses[i].photo
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
                            <a href="#" class="stretched-link text-white text-decoration-none">${filteredCourses[i].title}</a>
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
                    <a  class="btn btn-sm bg-success bg-opacity-10 text-success btn-round me-1 mb-0 viewCourse" id="${courses[i].courseId}"><i class="far fa-fw fa-edit viewCourse" id="${courses[i].courseId}"></i></a>
                    <a class="btn btn-sm bg-danger bg-opacity-10 text-danger btn-round mb-0 deleteCourse" id="${courses[i].courseId}"><i class="fas fa-fw fa-times deleteCourse" id="${courses[i].courseId}"></i></a>
                </td>
            </tr>

        `

        tableData.innerHTML += course;
    }

    if (filteredCourses.length > 0) {
        document.getElementById("noCourses").classList.add("visually-hidden");
    }
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
