import { redirectToUserErrorPage, redirectToUserRolePage } from '../../routers/router.js';
import { roleMapping } from '/auth/js/roleMapping.js';
import { checkCurrentUser } from "../../libraries/Api/user/userApi.js";
import { getParameterByName } from '../../security/getParameterByName.js';

var AccessKey = getParameterByName('AccessKey');

checkCurrentUserRole(AccessKey)

export async function checkCurrentUserRole(AccessKey) {
  try {
    if (!AccessKey) {
      throw new Error("Error 401 Unauthorized: No AccessKey Provided");
    }
    const user = await checkCurrentUser(AccessKey);
    if (!user) {
     redirectToUserErrorPage()
    } else {
      if (roleMapping[user.Role]) {
        window.location.href = roleMapping[user.Role]
      } else {
        redirectToUserRolePage()
      }
    }
  } catch (error) {
    throw new Error("Internal error: " + error);
  }
}