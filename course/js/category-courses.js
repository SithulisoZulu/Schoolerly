import { GetCourseCategory } from "../../controllers/course.js";
import { GetAllCourseLevels, GetCoursesByCategoryId } from "../../controllers/public/course.js"
import { getCourseLevelById } from "../../data/database/public/course.js";
import { getParameterByName } from "../../security/getParameterByName.js";
import { courseLevel } from "../../utils/checkCourseLevel.js";

const Id =  getParameterByName("id");

const getAllCourses = async() => {
    const courses = await GetCoursesByCategoryId(Id)
    var coursesData = document.getElementById("courses");
    var noCourse = 
    `
        <div class="card border bg-transparent rounded-3 mt-5 mb-5 text-white-50 w-100" id="noCourses">
            There are currently no courses under this Category                                                                                                                 
        </div>
    `
    if(!courses || courses.length <= 0)
    {
        coursesData.innerHTML += noCourse
        return
    }
    courses.forEach(loadCourses)
    async function loadCourses(course) {
        const levels = await getCourseLevelById(course.level)
        const level = await courseLevel(levels.name)
    const courseData = 
    `  
        <!-- Card item START -->
        <div class="col-sm-6 col-lg-6 col-xl-6">
            <div class="card shadow h-100 bg-dark-subtle">
                <!-- Image -->
                <img src="${course.photo}" class="card-img-top" alt="course image">
                <div class="card-body pb-0">
                    <!-- Title -->
                    <h5 class="card-title mt-3"><a href="/course/course-details.html?id=${course.courseId}"   class="text-decoration-none text-white">${course.title}</a></h5>
                    <!-- Badge and favorite -->
                    <div class="d-flex justify-content-between mb-2">
                        <a href="/course/level-courses.html?id=${course.level}">${level}</a>
                        <a href="#" class="text-danger"><i class="fas fa-heart"></i></a>
                    </div>
                    <!-- Rating star -->
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                        <li class="list-inline-item me-0 small"><i class="fas fa-star-half-alt text-warning"></i></li>
                        <li class="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                    </ul>
                </div>
                <!-- Card footer -->
                <div class="card-footer pt-0 pb-3 mt-3 sticky-bottom">
                    <div class="d-flex justify-content-between pt-3">
                        <span class="h6 fw-light mb-0"><i class="far fa-clock text-danger me-2"></i>${course.time}</span>
                        <span class="h6 fw-light mb-0"><i class="fas fa-table text-orange me-2"></i>65 lectures</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Card item END -->
    `
    coursesData.innerHTML += courseData
    }
}

const getAllCourseCategories = async () => {
    const allCategories = await GetCourseCategory();
    const categoriesHolder = document.getElementById('categories');
    const Id = getParameterByName("id"); // Get the 'Id' from your URL query parameter

    allCategories.forEach(loadCourses);

    async function loadCourses(cat) {
        const courses = await GetCoursesByCategoryId(cat.id)
        const category = `
            <li class="list-inline-item mb-2">
                <a href="/course/category-courses.html?id=${cat.id}" id="${cat.id}" class="btn btn-outline-secondary btn-sm stretch-link viewCourses ${cat.id === Id ? 'active' : ''}">
                    ${cat.name}
                    <span>( ${courses.length} )</span>
                </a>
            </li>
        `;
        categoriesHolder.innerHTML += category;
    }
}

const getAllCourseLevels = async () => {
    const allLevels = await GetAllCourseLevels();
    const levelsHolder = document.getElementById('levels');
    allLevels.forEach(loadLevels);
    async function loadLevels(lev) {
        const levels  = `
            <li class="list-inline-item mb-2">
                <a href="/course/level-courses.html?id=${lev.id}" id="${lev.id}" id="${lev.id}" class="btn bg-dark-subtle bg-opacity-10 p-2 rounded-3 btn-sm viewCourses ${lev.id === Id ? 'active' : ''}">
                ${lev.name}
                </a>
            </li>
        `
        levelsHolder.innerHTML += levels
    }
}

getAllCourseLevels()
getAllCourseCategories()
getAllCourses ()