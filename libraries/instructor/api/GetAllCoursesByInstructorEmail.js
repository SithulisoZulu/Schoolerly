//#region imports
import { collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { databaseURL as db } from "/libraries/firebaseApi.js";
import courseStatues from "../../courseStatuses.js";
//#endregion
let userEmail =  sessionStorage.getItem("userEmail");

export async function getCoursesByInstructorEmail()
{
    var courses = [];
    var tableData = document.getElementById("tableData");
    tableData.innerHTML = "";
    const Query = query(collection(db, "courses"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => 
    { 
        courses.push(doc.data())
        console.log(courses)
        for(let i = 0; i < courses.length; i++ )
        {

            var status;
            if(doc.data().status == courseStatues.Applied)
            {
                status = 
                `
                    <div class="badge bg-info bg-opacity-10 text-info">${courses[i].status}</div>
                `
            }

            if(doc.data().status == courseStatues.Disabled)
            {
                status = 
                `
                    <div class="badge bg-secondary bg-opacity-10 text-secondary">${courses[i].status}</div>
                `
            }

            if(doc.data().status == courseStatues.Rejected)
            {
                status = 
                `
                    <div class="badge bg-danger bg-opacity-10 text-danger">${courses[i].status}</div>
                `
            }

            if(doc.data().status == courseStatues.Live)
            {
                status = 
                `
                    <div class="badge bg-success bg-opacity-10 text-success">${courses[i].status}</div>
                `
            }

            if(doc.data().status == courseStatues.Pending)
            {
                status = 
                `
                <div class="badge bg-warning bg-opacity-10 text-warning">${courses[i].status}</div>
                `
            }

            var photo;
            if(doc.data().photo == "undefined")
            {
                photo = "/assets/images/01.jpg"
            }
            else{
                photo = doc.data().photo
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
                            <h6 style="padding-left: 7px; font-weight:700;"><a href="#" class="text-white text-decoration-none">${courses[i].title}</a></h6>
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
                        <a href="/pages/shared/edit-course.html" class="btn btn-sm bg-success bg-opacity-10 text-success btn-round me-1 mb-0" id="${courses[i].courseId}"><i class="far fa-fw fa-edit"></i></a>
                        <button class="btn btn-sm bg-danger bg-opacity-10 text-danger btn-round mb-0"><i class="fas fa-fw fa-times"></i></button>
                    </td>
                </tr>

            `
        }
        tableData.innerHTML += course;
    });
    if(courses.length > 0)
    {
        document.getElementById("noCourses").classList.add("visually-hidden");
    }
}

getCoursesByInstructorEmail()
