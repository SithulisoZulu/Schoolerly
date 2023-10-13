import courseStatues from "../libraries/courseStatuses.js";

export const checkStatus = async (status) => {
    var courseStatus;
    switch (status) {
        case courseStatues.Applied: 
            courseStatus = 
                `
            <div class = "badge bg-info bg-opacity-10 text-info p-2" >${status}</div>
        `
            break;
        case courseStatues.Disabled: 
            courseStatus = 
                `
            <div class = "badge bg-secondary bg-opacity-10 text-secondary p-2" >${status}</div>
        `
            break;
        case courseStatues.Rejected: 
            courseStatus = 
                `
            <div class = "badge bg-danger bg-opacity-10 text-danger p-2">${status}</div>
        `
            break;
        case courseStatues.Live: 
            courseStatus = 
                `
            <div class = "badge bg-success bg-opacity-10 text-success p-2">${status}</div>
        `
            break;
        case courseStatues.Pending: 
            courseStatus = 
            `
                <div class = "badge bg-warning bg-opacity-10 text-warning p-2">${status}</div>
            `
            break;
    }
    return courseStatus;
}