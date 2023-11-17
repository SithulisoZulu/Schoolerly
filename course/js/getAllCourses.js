import { feedback } from "../../components/notFound.js";
import { GetAllCourses } from "../../controllers/public/course.js"
import { getCourseLevelById } from "../../data/database/public/course.js";
import { courseLevel } from "../../utils/checkCourseLevel.js";

const getAllCourses = async () => {
    const courses     = await GetAllCourses()
    var   coursesData = document.getElementById("courses");
    if(courses.length === 0)
    {
        coursesData.innerHTML += await feedback("No Courses Found! 😥");
        return;
    };
    courses.forEach(loadCourses);
    async function loadCourses(course) {
    const levels     = await getCourseLevelById(course.level);
    const level      = await courseLevel(levels.name);
    const courseData = 
    `  
        <!-- Card item START -->
        <div class = "col-sm-6 col-lg-4 col-xl-3">
        <div class = "card shadow h-100 bg-dark-subtle">
                <!-- Image -->
                <img src   = "${course.photo}" class = "card-img-top" alt = "course image">
                <div class = "card-body pb-0">
                    <!-- Title -->
                    <h5 class = "card-title mt-3"><a href = "/course/course-details.html?id=${course.courseId}"   class = "text-decoration-none text-white">${course.title}</a></h5>
                    <!-- Badge and favorite -->
                    <div class = "d-flex justify-content-between mb-2">
                    <a   href  = "/course/level-courses.html?id=${course.level}">${level}</a>
                    <a   href  = "#" class = "text-danger"><i class = "fas fa-heart"></i></a>
                    </div>
                    <!-- Rating star -->
                    <ul class = "list-inline mb-0">
                    <li class = "list-inline-item me-0 small"><i class = "fas fa-star text-warning"></i></li>
                    <li class = "list-inline-item me-0 small"><i class = "fas fa-star text-warning"></i></li>
                    <li class = "list-inline-item me-0 small"><i class = "fas fa-star text-warning"></i></li>
                    <li class = "list-inline-item me-0 small"><i class = "fas fa-star text-warning"></i></li>
                    <li class = "list-inline-item me-0 small"><i class = "fas fa-star-half-alt text-warning"></i></li>
                    <li class = "list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                    </ul>
                </div>
                <!-- Card footer -->
                <div  class = "card-footer pt-0 pb-3 mt-3 sticky-bottom">
                <div  class = "d-flex justify-content-between pt-3">
                <span class = "h6 fw-light mb-0"><i class = "far fa-clock text-danger me-2"></i>${course.time}</span>
                <span class = "h6 fw-light mb-0"><i class = "fas fa-table text-orange me-2"></i>65 lectures</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Card item END -->
    `;
    coursesData.innerHTML += courseData;
    }
}

const search = document.getElementById('search')
search.addEventListener('keydown', () => {
    if(search.value !==  null && search.value !== '')
    {
        document.getElementById('searchIcon').classList.add('visually-hidden');
        document.getElementById('close').classList.remove('visually-hidden');
    }
    else{
        document.getElementById('searchIcon').classList.remove('visually-hidden');
        document.getElementById('close').classList.add('visually-hidden');
    }

    document.getElementById('close').addEventListener('click', () => {
        search.value = ''
        document.getElementById('searchIcon').classList.remove('visually-hidden');
        document.getElementById('close').classList.add('visually-hidden');
    })
})

getAllCourses ();