export const route = {

  //#region AuthPages
      loadingPageUrl: '/pages/auth/loading.html',
      loginPageUrl: '/pages/auth/login.html',
      CompleteProfilePageUrl: '/pages/auth/profile.html',
      CompletedProfilePageUrl: '/pages/auth/ProfileComplete.html',
  //#endregion

  //#region AdminPages
      adminHomePageUrl: '/pages/admin/home.html',
  //#endregion

  //#region StudentPages
      studentHomePageUrl: '/pages/student/home.html',
  //#endregion

  //#region instructorPage
      instructorDashboard: '/pages/instructor/instructor-dashboard.html',
      instructorUploadCourseMedia: '/pages/instructor/instructor-upload-course-media.html',
      instructorUpdateCourseCurriculum: '/pages/instructor/instructor-update-course-curriculum.html',
      instructorCourseAdditionalInformation: '/pages/instructor/instructor-course-additional-information.html',
  //#endregion

  //#region Errors
      offlinePageUrl: '/pages/error/offline.html',
      userErrorPageUrl: '/pages/error/nouserError.html',
      UserRolePageUrl: '/pages/error/userRoleError.html',
  //#endregion

  //#region logs
      logsFileUrl : '/logs/logs.txt',
  //#endregion

  //#region shared
      courseAdded: '/pages/shared/course-added.html'
  //#endregion
}


export async function redirectToLoadingPage() {
  try {
    if (!route.loadingPageUrl) {
      throw new Error("Loading page URL is not defined");
    }
    window.location.href = route.loadingPageUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("Loading page URL is not defined");
  }
}

export async function redirectToCompletedProfilePage() {
  try {
    if (!route.CompletedProfilePageUrl) {
      throw new Error("Loading page URL is not defined");
    }
    window.location.href = route.CompletedProfilePageUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("CompletedProfilePage page URL is not defined");
  }
}

export async function redirectToOfflinePage() {
  try {
    if (!route.offlinePageUrl) {
      throw new Error("Loading page URL is not defined");
    }
    window.location.href = route.offlinePageUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("CompletedProfilePage page URL is not defined");
  }
}

export async function redirectToUserErrorPage() {
  try {
    if (!route.userErrorPageUrl) {
      throw new Error("Loading page URL is not defined");
    }
    window.location.href = route.userErrorPageUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("CompletedProfilePage page URL is not defined");
  }
}
export async function redirectToUserRolePage() {
  try {
    if (!route.UserRolePageUrl) {
      throw new Error("Loading page URL is not defined");
    }
    window.location.href = route.UserRolePageUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("CompletedProfilePage page URL is not defined");
  }
}
export async function redirectToCompleteProfilePage()
{
  try {
    if (!route.CompleteProfilePageUrl) {
      throw new Error("CompleteProfile page URL is not defined");
    }
    window.location.href = route.CompleteProfilePageUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("CompleteProfile page URL is not defined" + error);
  }
}

export async function redirectToLoginPage()
{
  try {
    if (!route.loginPageUrl) {
      throw new Error("login page URL is not defined");
    }
    window.location.href = route.loginPageUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("login page URL is not defined" + error);
  }
}

// Role Mapping Pages
export async function redirectToAdminHomePage()
{
  try {
    if (!route.adminHomePageUrl) {
      throw new Error("adminHome page URL is not defined");
    }
    window.location.href = route.adminHomePageUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("adminHome page URL is not defined" + error);
  }
}
export async function redirectToStudentHomePage()
{
  try {
    if (!route.studentHomePageUrl) {
      throw new Error("studentHome page URL is not defined");
    }
    window.location.href = route.studentHomePageUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("studentHome page URL is not defined" + error);
  }
}
export async function redirectToInstructorDashboardPage()
{
  try {
    if (!route.instructorDashboard) {
      throw new Error("instructorDashboard page URL is not defined");
    }
    window.location.href = route.instructorDashboard;
  } catch (error) {
    console.error("Error redirecting:", error);
    throw new Error("instructorDashboard page URL is not defined" + error);
  }
}