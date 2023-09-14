"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCurrentUserRole = checkCurrentUserRole;

var _router = require("../../../routers/router.js");

var _roleMapping = require("./roleMapping.js");

var _userApi = require("../../../libraries/Api/user/userApi.js");

function checkCurrentUserRole() {
  var userEmail, user, Role;
  return regeneratorRuntime.async(function checkCurrentUserRole$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userEmail = sessionStorage.getItem("userEmail");
          _context.prev = 1;

          if (userEmail) {
            _context.next = 4;
            break;
          }

          throw new Error("Error 401 Unauthorized: No Email Provided");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _userApi.checkCurrentUser)(userEmail));

        case 6:
          user = _context.sent;

          if (!user) {
            window.location.href = _router.route.UserRolePageUrl;
          } else {
            Role = user.Role;

            if (_roleMapping.roleMapping[Role]) {
              window.location.href = _roleMapping.roleMapping[Role];
            } else {
              window.location.href = _router.route.UserRolePageUrl;
            }
          }

          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          throw new Error("Internal error: " + _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

checkCurrentUserRole();