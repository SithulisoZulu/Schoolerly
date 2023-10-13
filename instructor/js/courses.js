import { GetAllCourseByUserId } from "../../controllers/course.js"
import courseStatues from "../../libraries/courseStatuses.js";
import { checkStatus } from "../../utils/checkStatus.js";

const getAllCourseByUserId = async () => {
    const courses = await GetAllCourseByUserId()
    var tableData = document.getElementById("tableData");
    tableData.innerHTML = "";
    for(let i = 0; i < courses.length; i++) {

        var photo;
        if(courses[i].photo === "undefined" || courses[i].photo === "")
        {
            photo = "/assets/images/01.jpg"
        }
        else{
            photo = courses[i].photo
        }
        const status = await checkStatus(courses[i].status)
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
                        <h6  style="padding-left: 7px; font-weight:700;"><a  class="text-white text-decoration-none" onclick="getId(div)" id="${courses[i].courseId}">${courses[i].title}</a></h6>
                        <!-- Info -->
                        <div class="d-sm-flex"style="padding-left: 7px;">
                            <p class="h6 fw-light mb-0 small me-3"><i class="fas fa-table text-warning me-2"></i>18 lectures</p>
                            <p class="h6 fw-light mb-0 small"><i class="fas fa-check-circle text-success me-2"></i><time class="timeago" datetime="2023-08-21T16:16:17Z"></time></p>
                        </div>
                    </div>
                
                </td>
                <!-- Enrolled item -->
                <td class="text-center text-sm-start">${courses[i].enrolled}</td>
                <!-- Status item -->
                <td id="status">
                    ${status}
                </td>
                <!-- Price item -->
                <td>R ${courses[i].price}</td>
                <!-- Action item -->
                <td>
                    <a  class="btn btn-sm bg-success bg-opacity-10 text-success btn-round me-1 mb-0" id="${courses[i].courseId}"><i class="far fa-fw fa-edit"></i></a>
                    <button class="btn btn-sm bg-danger bg-opacity-10 text-danger btn-round mb-0 delete"><i class="fas fa-fw fa-times"></i></button>
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