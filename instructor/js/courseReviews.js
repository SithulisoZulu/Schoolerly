import { GetAllCourseByUserId, GetAllCourseReviews } from "../../controllers/course.js";
import { checkCourseRatings } from "../../utils/checkCourseRating.js";
import { checkCourseTotalRatings } from "../../utils/checkCourseTotalReviews.js";
import { checkStatus } from "../../utils/checkStatus.js";

const getAllCourseByUserId = async () => {
    const courses = await GetAllCourseByUserId()
    console.log(courses)
    var tableData = document.getElementById("tableData");
    tableData.innerHTML = "";
    for(let i = 0; i < courses.length; i++) {
       
        const courseReviews = await GetAllCourseReviews(courses[i].courseId)
        const rating = await checkCourseTotalRatings(courseReviews.length)

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
                    <div class="d-flex align-items-center">
                        <!-- Image -->
                        <div class="w-60px">
                        <div class="w-60px"><img src="${photo}" class="rounded" alt="" width="60" height="40" style="object-fit: cover;"></div>
                    </div>
                    <div class="mb-0 ms-2">
                        <!-- Title -->
                        <h6  style="padding-left: 7px; font-weight:700;"><a  class="text-white text-decoration-none viewCourseDetails" id="${courses[i].courseId}" style="cursor: pointer">${courses[i].title}</a></h6>
                        <!-- Info -->
                        <div class="d-sm-flex"style="padding-left: 7px;">
                            <p class="h6 fw-light mb-0 small me-3 visually-hidden"><i class="fas fa-table text-warning me-2"></i>18 lectures</p>
                            <p class="h6 fw-light mb-0 small visually-hidden"><i class="fas fa-check-circle text-success me-2"></i><time  class="timeago" datetime="2023-08-21T16:16:17Z"></time></p>
                        </div>
                    </div>
                
                </td>
                <!-- Enrolled item -->
                <td class="text-center text-sm-start">${courses[i].enrolled}</td>
                <!-- Status item -->
                <td id="status">
                    ${rating}
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
    if(courses.length > 0)
    {
        document.getElementById("noCourses").classList.add("visually-hidden");
    }
}

getAllCourseByUserId()