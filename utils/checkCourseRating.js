export const checkCourseRatings = async (rating) => {
    let courseRating = '';
    if(rating == 1 )
    {
        courseRating =` 
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
        `
    }
    if(rating == 2 )
    {
        courseRating =` 
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
        ` 
    }
    if(rating == 3 )
    {
        courseRating =` 
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star-outline text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star-outline text-warning"></i></li>
        `
    }
    if(rating == 4 )
    {
        courseRating =` 
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
        `
    }
    if(rating == 5 )
    {
        courseRating =` 
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
        `
    }

    return courseRating;
}