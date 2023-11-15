export const checkCourseTotalRatings = async (rating) => {
    let courseRating = '';

    const fullStarCount = Math.floor(rating / 20); // Number of full stars
    const remainingStar = rating % 20; // Remaining rating for partial star

    // Full stars
    for (let i = 0; i < fullStarCount; i++) {
        courseRating += `
            <li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li>
        `;
    }

    // Partial star
    if (remainingStar > 0) {
        courseRating += `
            <li class="list-inline-item me-0"><i class="fas fa-star-half-alt text-warning"></i></li>
        `;
    }

    // Remaining empty stars
    const emptyStarCount = 5 - fullStarCount - (remainingStar > 0 ? 1 : 0);
    for (let i = 0; i < emptyStarCount; i++) {
        courseRating += `
            <li class="list-inline-item me-0"><i class="far fa-star text-warning"></i></li>
        `;
    }

    return courseRating;
}
