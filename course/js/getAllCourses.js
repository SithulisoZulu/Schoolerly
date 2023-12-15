import { feedback } from "../../components/notFound.js";
import { GetAllCourses } from "../../controllers/public/course.js"
import { getCourseLevelById } from "../../data/database/public/course.js";
import { courseLevel } from "../../utils/checkCourseLevel.js";

const getAllCourses = async () => {
    const courses = await GetAllCourses();
    const coursesData = document.getElementById("courses");
    const itemsPerPage = 12; // You can adjust this based on your preference
    let currentPage = 1;

    const totalPages = Math.ceil(courses.length / itemsPerPage);

    if (courses.length === 0) {
        coursesData.innerHTML += await feedback("No Courses Found! 😥");
        return;
    }

    renderCourses(currentPage);

    function renderCourses(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageCourses = courses.slice(startIndex, endIndex);

        coursesData.innerHTML = ''; // Clear previous courses

        currentPageCourses.forEach(async course => {
            const levels = await getCourseLevelById(course.level);
            const level = await courseLevel(levels.name);
            const courseData = `
            <!-- Card item START -->
            <div class = "col-sm-6 col-lg-4 col-xl-3">
            <div class = "card shadow h-100 bg-dark-subtle">
                    <!-- Image -->
                    <img src   = "${course.photo}" class = "card-img-top" alt = "course image">
                    <div class = "card-body pb-0">
                        <!-- Title -->
                        <h5 class = "card-title mt-3  text-truncate-2"><a href = "/course/course-details.html?id=${course.courseId}"   class = "text-decoration-none">${course.title}</a></h5>
                        <!-- Badge and favorite -->
                        <div class = "d-flex justify-content-between mb-2 mt-2">
                            <a   href  = "/course/level-courses.html?id=${course.level}">${level}</a>
                            <a href="#" class="h6 fw-light mb-0"><i class="far fa-heart"></i></a>
                        </div>
                        <div class="mt-3 text-truncate-2" >
                            ${course.shortDescription}
                        </div>
                    </div>
                    <!-- Card footer -->
                    <div  class = "card-footer pt-0 pb-3 mt-3 ">
                    <div  class = "d-flex justify-content-between pt-3">
                    <span class = "h6 fw-light mb-0"><i class = "far fa-clock text-danger me-2"></i>${course.time}</span>
                    <span class = "h6 fw-light mb-0"><i class="fa-solid fa-user-graduate text-orange me-2"></i>${course.enrolled} Enrolled</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Card item END -->
            `;
            coursesData.innerHTML += courseData;
        });

        renderPagination();
    }

    function renderPagination() {
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = '';
    
        const paginationList = document.createElement('ul');
        paginationList.classList.add('pagination', 'pagination-sm');
    
        // Previous button
        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item');
    
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link', 'me-1', 'border-0' , 'bg-light');
        prevLink.href = '#';
        prevLink.innerHTML = 'Previous';
    
        prevLink.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderCourses(currentPage);
            }
        });
    
        prevItem.appendChild(prevLink);
        paginationList.appendChild(prevItem);
    
        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
    
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link', 'me-1', 'border-0', 'bg-light');
            pageLink.href = '#';
            pageLink.textContent = i;
    
            if (i === currentPage) {
                pageItem.classList.add('active');
            }
    
            pageLink.addEventListener('click', () => {
                currentPage = i;
                renderCourses(currentPage);
            });
    
            pageItem.appendChild(pageLink);
            paginationList.appendChild(pageItem);
        }
    
        // Next button
        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item');
    
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link', 'me-1', 'border-0', 'bg-light');
        nextLink.href = '#';
        nextLink.innerHTML = 'Next';
    
        nextLink.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderCourses(currentPage);
            }
        });
    
        nextItem.appendChild(nextLink);
        paginationList.appendChild(nextItem);
    
        paginationContainer.appendChild(paginationList);
    }  
};

// Call the function
getAllCourses();

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


document.getElementById('login').addEventListener('click', () => {
    $("#loginModal").modal('show')
    // location.href = `/cart/redirect/login.html?id=${courseId}`
  })