export const feedback  = async (message) => {
    const notFound =  `
    <div class="card border bg-transparent rounded-3 mt-2 mb-2" id="feedback">
        ${message}
    </div>
    `
    return notFound;
} 