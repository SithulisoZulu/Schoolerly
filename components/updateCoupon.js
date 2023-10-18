export const openModal = async (body, id) => {
    const modal =  
    `
        <!-- Modal -->
        <div class="modal fade" id="updateCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Update Coupon Information</h5>
                </div>
                <div class="modal-body">
                ${body}
                </div>
                <div class="modal-footer">
                <button type="button" class="btn bg-danger bg-opacity-10 text-danger-emphasis my-0" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary mark" id="${id}">Mark as Seen</button>
                </div>
                </div>
            </div>
        </div>    
    `;
    return modal
}