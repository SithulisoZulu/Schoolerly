import courseLevels from "../libraries/courseLevels.js";

export const courseLevel = async (level) => {
    var courseLevel;
    switch (level) {
        case courseLevels.AllLevel: 
            courseLevel = 
                `
            <div class = "badge bg-success bg-opacity-25 p-2" >${level}</div>
        `
            break;
        case courseLevels.Advanced: 
            courseLevel = 
                `
            <div class = "badge bg-warning bg-opacity-25 p-2" >${level}</div>
        `
            break;
        case courseLevels.Beginner: 
            courseLevel = 
                `
            <div class = "badge bg-primary bg-opacity-25  p-2">${level}</div>
        `
            break;
        case courseLevels.Intermediate: 
            courseLevel = 
                `
            <div class = "badge bg-secondary bg-opacity-25 p-2">${level}</div>
        `
            break;
    }
    return courseLevel;
}