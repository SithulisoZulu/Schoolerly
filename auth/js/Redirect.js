import { redirectToUserErrorPage, redirectToUserRolePage } from '../../routers/router.js';
import { roleMapping } from '/auth/js/roleMapping.js';
import { checkCurrentUser } from "../../libraries/Api/user/userApi.js";
import { getParameterByName } from '../../security/getParameterByName.js';

var userEmail = getParameterByName('AccessKey');

checkCurrentUserRole(userEmail)

export async function checkCurrentUserRole(userEmail) {
  try {
    if (!userEmail) {
      throw new Error("Error 401 Unauthorized: No Email Provided");
    }
    const user = await checkCurrentUser(userEmail);
    if (!user) {
     redirectToUserErrorPage()
    } else {
      const Role = user.Role;
      if (roleMapping[Role]) {
        window.location.href = roleMapping[Role]
      } else {
        redirectToUserRolePage()
      }
    }
  } catch (error) {
    throw new Error("Internal error: " + error);
  }
}