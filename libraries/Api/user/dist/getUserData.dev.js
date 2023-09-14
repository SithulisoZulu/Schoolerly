"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserDataByEmail = getUserDataByEmail;

var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js");

var _firebaseApi = require("../../firebaseApi.js");

function getUserDataByEmail(userEmail) {
  var userQuery, querySnapshot, userData, user;
  return regeneratorRuntime.async(function getUserDataByEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(userEmail === null || userEmail === undefined)) {
            _context.next = 2;
            break;
          }

          throw new Error("Invalid userEmail");

        case 2:
          userQuery = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebaseApi.databaseURL, "users"), (0, _firebaseFirestore.where)("email", "==", userEmail), (0, _firebaseFirestore.limit)(1));
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _firebaseFirestore.getDocs)(userQuery));

        case 6:
          querySnapshot = _context.sent;
          userData = querySnapshot.docs.map(function (doc) {
            return doc.data();
          });
          user = userData[0];
          return _context.abrupt("return", user);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.error("Error fetching user data:", _context.t0);
          throw _context.t0;

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
}