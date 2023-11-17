import { getApplicationDetailsById } from "../../data/database/ApplicationRepository.js"
import { getUserDataByEmail } from "../../libraries/Api/user/getUserData.js"
import applicationStatues from "../../libraries/applicationStatuses.js"
import { getParameterByName } from "../../security/getParameterByName.js"

const Id = getParameterByName('id')
const Application = await getApplicationDetailsById(Id)


// Assuming there is additional code outside the code snippet

// Example after code:
if(Application.status === applicationStatues.Pending) 
{
    const date = Application.submittedDate.toDate().toDateString();
    document.getElementById('submittedDate').textContent = date

    const student = await getUserDataByEmail(Application.email)

    document.getElementById('studentName').textContent = student.Name + ' ' + student.Surname
}

const ApplicationDate = new Date(Application.submittedDate.seconds * 1000 + Application.submittedDate.nanoseconds / 1000000);
const currentDate = new Date();

if(Application.status === applicationStatues.Pending && ApplicationDate < currentDate) 
{
    const date = currentDate.toDateString();
    document.getElementById('waitingForApprovals').classList.remove('visually-hidden');
    document.getElementById('pendingApprovalsDate').textContent = date;
}

async function setApproverData(approver) {
    document.getElementById('firstApproverName').textContent = approver.Name + " " +  approver.Surname ;
    document.getElementById('approvedByFirstApprover').classList.remove('visually-hidden')
    const date = Application.submittedDate.toDate().toDateString();
    document.getElementById('submittedDate').textContent = date

    const student = await getUserDataByEmail(Application.email)

    document.getElementById('studentName').textContent = student.Name + ' ' + student.Surname

    document.getElementById('approvedByFirstApproverDate').textContent = Application.approvedByFirstApproverDate.toDate().toDateString();

    const waitingDate = currentDate.toDateString();
    document.getElementById('waitingForApprovals').classList.remove('visually-hidden');
    document.getElementById('pendingApprovalsDate').textContent = waitingDate;
}

if(Application.status === applicationStatues.ApprovedByFirstApprover)
{
    const approver =  await getUserDataByEmail(Application.firstApprover);
    setApproverData(approver);
}

if(Application.status === applicationStatues.Rejected)
{
    const student = await getUserDataByEmail(Application.email)
    document.getElementById('studentName').textContent = student.Name + ' ' + student.Surname
    document.getElementById('rejected').classList.remove('visually-hidden')
    const approver =  await getUserDataByEmail(Application.firstApprover);
    setApproverData(approver);
    document.getElementById('rejectedBtn').classList.remove('visually-hidden')
    document.getElementById('rejectedDateDate').textContent = Application.rejectedDate.toDate().toDateString();
}

if(Application.status === applicationStatues.Approved)
{
    const student = await getUserDataByEmail(Application.email)
    document.getElementById('studentName').textContent = student.Name + ' ' + student.Surname
    document.getElementById('approved').classList.remove('visually-hidden')
    const approver =  await getUserDataByEmail(Application.firstApprover);
    setApproverData(approver);
    document.getElementById('approvedBtn').classList.remove('visually-hidden')
    document.getElementById('approvedDate').textContent = Application.approvedDate.toDate().toDateString();
}