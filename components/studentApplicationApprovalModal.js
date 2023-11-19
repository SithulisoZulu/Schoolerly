export const openModal = async (body, id) => {
    var modal = 
    ` 
        <div class="modal fade" id="applicationDetailsModal" tabindex="-1" aria-labelledby="appDetaillabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered  modal-xl" role="document">
                <div class="modal-content">
            
                    <!-- Modal header -->
                    <div class="modal-header bg-black">
                        <h5 class="modal-title text-white" >Student Applicant details</h5>
                        <button type="button" class="btn btn-sm btn-dark mb-0" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x"></i></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body p-5">
                        ${body}
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn bg-danger bg-opacity-10 text-danger-emphasis my-0" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    return modal;
}