import userRoles from '../../../libraries/roles.js';
import { route } from '../../../routers/router.js';

export const roleMapping = {
    [userRoles.Admin]: route.adminHomePageUrl,
    [userRoles.Instructor]: route.instructorDashboard,
    [userRoles.Student]: route.studentHomePageUrl,
    [userRoles.Unverified]: route.CompleteProfilePageUrl
};