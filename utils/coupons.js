export const courseLimit = async (limit) => {
    var limits;
    if (limit === true) {
        limits = `
            <div class="badge bg-success bg-opacity-10 text-success p-2">${limit}</div>
        `;
    } else if (limit === false) {
        limits = `
            <div class="badge bg-danger bg-opacity-10 text-danger p-2">${limit}</div>
        `;
    } else {
        // Handle other cases or provide a default value if needed
        limits = "Some default content";
    }

    return limits;
}
export const courseQuantity = async (quantity, limit) => {
    var quantities;

    if (quantity > 0) {
        quantities = `
            <div class="badge bg-success bg-opacity-10 text-success p-2">${quantity}</div>
        `;
    } else if (quantity <= 0) {
        if(limit === true)
        {
            quantities = `
            <div class="badge bg-danger bg-opacity-10 text-danger p-2">${quantity}</div>
        `;
        }else {
            quantities = `
            <div class="badge bg-danger bg-opacity-10 text-danger p-2">Coupon is Unlimited</div>
        `;
        }
    } else {
        // Handle other cases or provide a default value if needed
        quantities = "Some default content";
    }

    return quantities;
}
