import { GetAllCourseByUserId } from "../../controllers/course.js"

const getNumberOfCourseByUserId = async () => {
    const courses = await GetAllCourseByUserId()
    document.getElementById("courses").innerHTML = courses.length
}

getNumberOfCourseByUserId()