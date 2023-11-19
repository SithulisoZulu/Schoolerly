export const checkCourseTotalRatings = async (rating) => {
    let courseRating = '';

    // Ensure fullStarCount doesn't exceed 5
    const fullStarCount = Math.min(Math.floor(rating / 20), 5);

    const remainingStar = rating % 20; // Remaining rating for partial star

    // Full stars
    for (let i = 0; i < fullStarCount; i++) {
        courseRating += `
            <li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li>
        `;
    }

    // Partial star
    if (remainingStar > 0) {
        // Use fas (solid) stars if ratings are more than 100
        const partialStarIcon = rating > 100 ? "fas" : "fas fa-star-half-alt";
        courseRating += `
            <li class="list-inline-item me-0"><i class="${partialStarIcon} text-warning"></i></li>
        `;
    }

    // Remaining empty stars
    if (rating <= 100) {
        const emptyStarIcon = rating > 100 ? "fas" : "far";
        const emptyStarCount = 5 - fullStarCount - (remainingStar > 0 ? 1 : 0);
        for (let i = 0; i < emptyStarCount; i++) {
            courseRating += `
                <li class="list-inline-item me-0"><i class="${emptyStarIcon} fa-star text-warning"></i></li>
            `;
        }
    }

    return courseRating;
}
