import { GetCartDetails } from '../../controllers/cart.js'
import { getCourseById } from '../../data/database/course.js';
import { getParameterByName } from '../../security/getParameterByName.js';

const  Id             = getParameterByName('id')
const getCartDetails = async (Id) => {
  const cart =  await GetCartDetails(Id);

  document.getElementById('orderNo').textContent = cart[0].orderNumber
  const courseHolder =  document.getElementById('courses')
  courseHolder.innerHTML.replace()
  cart.map(async (cart) => {
    for(var i = 0; i < cart.courses.length; i ++) {
      const courses = await getCourseById(cart.courses[i])
      const course =  
      `
        <div class="card border shadow-none">
            <div class="card-body">
                <div class="d-flex align-items-start pb-3">
                    <div class="me-4">
                        <img src=${courses.photo} alt="" class="avatar-lg rounded object-fit-cover">
                    </div>
                    <div class="flex-grow-1 align-self-center overflow-hidden">
                        <div>
                            <p class="mb-0 mt-1">Course : <span class="fw-bold">${courses.title}</span></p>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="mt-3">
                                    <h5 class="mb-0 mt-2"><span class="text-muted me-2"><del class="font-size-16 fw-normal">$750</del></span>$950</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-shrink-0 ms-2">
                        <ul class="list-inline mb-0 font-size-16">
                            <li class="list-inline-item">
                                <a href="#" class="x-1 bg-danger rounded-3 bg-opacity-10 text-danger p-2">
                                    <i class="mdi mdi-trash-can-outline"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#" class="text-muted px-1">
                                    <i class="mdi mdi-heart-outline"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- end card -->
      `
      courseHolder.innerHTML += course
    }
  });
}

getCartDetails(Id)