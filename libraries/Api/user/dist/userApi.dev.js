"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CreateUser;
exports.signUpWithGoogle = signUpWithGoogle;
exports.checkCurrentUser = checkCurrentUser;
exports.update = update;

var _firebaseAuth = require("https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js");

var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js");

var _getUserData = require("./getUserData.js");

var _firebaseApi = require("../../firebaseApi.js");

var _messages = require("../../success/messages.js");

var _messages2 = require("../../errors/messages.js");

var _roles = _interopRequireDefault(require("../../roles.js"));

var _router = require("../../../routers/router.js");

var _AuthProviders = _interopRequireDefault(require("../../auth/AuthProviders.js"));

var _sanitizer = require("../../sanitizer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = (0, _firebaseAuth.getAuth)(_firebaseApi.app);
var provider = new _firebaseAuth.GoogleAuthProvider();
/**
 * @param {string} email The string
 * @param {string} password The string
 */
//#region signup

function CreateUser(email, password) {
  var userCredential, user, userEmail, uid;
  return regeneratorRuntime.async(function CreateUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _firebaseAuth.createUserWithEmailAndPassword)(auth, email, password));

        case 3:
          userCredential = _context.sent;
          user = userCredential.user;
          userEmail = user.email;
          uid = user.uid;
          document.getElementById('alert-success').classList.remove('visually-hidden');
          document.getElementById('message').innerText = _messages.successMessages.UserCreated;
          sessionStorage.setItem("userEmail", userEmail);
          sessionStorage.setItem("userId", uid);
          _context.next = 13;
          return regeneratorRuntime.awrap(addUserData(uid, userEmail));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap((0, _router.redirectToLoadingPage)());

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          handleCreateUserError(_context.t0);
          throw new Error("500: Internal server error" + _context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
} //#endregion signup


function signUpWithGoogle() {
  var result, loggedInUser, uid, userEmail;
  return regeneratorRuntime.async(function signUpWithGoogle$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _firebaseAuth.signInWithPopup)(auth, provider));

        case 3:
          result = _context2.sent;
          loggedInUser = result.user;
          uid = loggedInUser.uid;
          userEmail = loggedInUser.email;
          _context2.next = 9;
          return regeneratorRuntime.awrap(checkUser(loggedInUser, userEmail, uid));

        case 9:
          Redirect();
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          throw new Error("Error signing up with Google:", _context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

function checkUser(loggedInUser, userEmail, uid) {
  var querySnapshot, usersData, docRef;
  return regeneratorRuntime.async(function checkUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getUserData.getUserDataByEmail)(userEmail));

        case 2:
          querySnapshot = _context3.sent;
          usersData = querySnapshot.docs.map(function (doc) {
            return doc.data();
          });
          _context3.prev = 4;

          if (!querySnapshot.empty) {
            _context3.next = 11;
            break;
          }

          _context3.next = 8;
          return regeneratorRuntime.awrap((0, _firebaseFirestore.setDoc)((0, _firebaseFirestore.doc)(_firebaseApi.databaseURL, "users", uid), {
            DisplayName: loggedInUser.displayName,
            email: loggedInUser.email,
            Contact: loggedInUser.phoneNumber,
            Role: _roles["default"].Unverified,
            id: loggedInUser.uid,
            photo: loggedInUser.photoURL,
            creationTime: loggedInUser.metadata.creationTime,
            emailVerified: loggedInUser.emailVerified,
            provider: _AuthProviders["default"].GoogleAuthProvider
          }));

        case 8:
          docRef = _context3.sent;
          sessionStorage.setItem("userId", docRef.id);
          sessionStorage.setItem("userEmail", userEmail);

        case 11:
          if (usersData.length >= 1) {
            sessionStorage.setItem("userEmail", userEmail);
            location.replace(_router.route.loadingPageUrl);
          }

          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](4);
          handleCreateUserError(_context3.t0);
          throw new Error("Internal server error 500: Error add this user to the data base");

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 14]]);
}

function addUserData(uid, userEmail) {
  var docRef;
  return regeneratorRuntime.async(function addUserData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _firebaseFirestore.setDoc)((0, _firebaseFirestore.doc)(_firebaseApi.databaseURL, "users", uid), {
            email: (0, _sanitizer.sanitizeInput)(userEmail),
            Role: _roles["default"].Unverified,
            id: (0, _sanitizer.sanitizeInput)(uid),
            creationDate: (0, _firebaseFirestore.serverTimestamp)(),
            emailVerified: false,
            provider: _AuthProviders["default"].createUserWithEmailAndPassword
          }));

        case 2:
          docRef = _context4.sent;

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function checkCurrentUser(userEmail) {
  var userData;
  return regeneratorRuntime.async(function checkCurrentUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap((0, _getUserData.getUserDataByEmail)(userEmail));

        case 3:
          userData = _context5.sent;

          if (userData) {
            _context5.next = 7;
            break;
          }

          (0, _router.redirectToUserRolePage)();
          throw new Error("Error occurred while checking current user: User not found");

        case 7:
          return _context5.abrupt("return", userData);

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}
/**
 * Updates user data in the Firestore database.
 * @param {Object} data - An object containing the updated user data.
 * @param {string} userId - The ID of the user to be updated in the Firestore database.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */


function update(data, userId) {
  var updateRef;
  return regeneratorRuntime.async(function update$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          updateRef = (0, _firebaseFirestore.doc)(_firebaseApi.databaseURL, "users", userId);
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap((0, _firebaseFirestore.updateDoc)(updateRef, {
            Name: data.name,
            Surname: data.surname,
            Contact: data.contact,
            Date: '',
            email: data.email,
            Role: data.select,
            Address: data.address,
            photo: data.photoUrl
          }));

        case 4:
          location.replace(_router.route.CompletedProfilePageUrl);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](1);
          throw _context6.t0.message + "" + _context6.t0.code;

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 7]]);
}

function Redirect() {
  location.replace(_router.route.CompleteProfilePageUrl);
}

function handleCreateUserError(error) {
  var errorCode;
  return regeneratorRuntime.async(function handleCreateUserError$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          errorCode = error.code;
          document.getElementById('error-message').innerText = _messages2.ErrorMessage.SignupErrorMessage + " " + errorCode + " " + _messages2.ErrorMessage.PleaseTry;
          document.getElementById('alert-Error').classList.remove('visually-hidden');

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
}