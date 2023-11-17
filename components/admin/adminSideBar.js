export const sidebar = `
<div class="logo-details">
<i class="bi bi-book"></i>
<span class="logo-name">Schoolerly</span>
</div>
<ul class="nav-links">
<li class="" >
    <a href="/admin/home.html">
        <i class="bi bi-grid"></i>
        <span class="link_name">Dashboard</span>
    </a>
    <ul class="sub-menu blank">
        <li><a class="link_name" href="/admin/home.html">Dashboard</a></li>
    </ul>
</li>
<!-- <li class="nav-item ms-2 my-2">Pages</li> -->
<li class="mt-2">
   <div class="icon-link">
    <a href="">
    <i class="fa-solid fa-thumbs-up"></i>
        <span class="link_name">Approvals</span>
    </a>
    <i class="bi bi-chevron-down arrow"></i>
   </div>
   <ul class="sub-menu mt-1">
    <li><a class="link_name" href="#">Courses</a></li>
    <li><a href="/admin/Courses/allCourses.html">All Courses</a></li>
    <li ><a  href="/admin/Courses/courseApprovals.html">Courses Approvals <span class="badge bg-success" style="margin-left:5%;"></span></a></li>
    <li><a href="/admin/Courses/Courses-Reviews.html">Courses review</a></li>   
   </ul>
</li>
<li class="mt-2">
   <div class="icon-link">
    <a href="/admin/Courses/allCourses.html">
        <i class="bi bi-basket fa-fw me-2"></i>
        <span class="link_name">Courses</span>
    </a>
    <i class="bi bi-chevron-down arrow"></i>
   </div>
   <ul class="sub-menu mt-1">
    <li><a class="link_name" href="#">Courses</a></li>
    <li><a href="/admin/Courses/allCourses.html">All Courses</a></li>
    <li ><a  href="/admin/Courses/courseApprovals.html">Courses Approvals <span class="badge bg-success" style="margin-left:5%;"></span></a></li>
    <li><a href="/admin/Courses/Courses-Reviews.html">Courses review</a></li>   
   </ul>
</li>
<li class="mt-2">
    <a href="/admin/students/">
        <i class="fa fa-user-graduate fa-fw me-2"></i>
        <span class="link_name">Students</span>
    </a>
    <ul class="sub-menu blank">
        <li><a class="link_name" href="/admin/students/">Students</a></li>
    </ul>
</li>
<li class="mt-2">
   <div class="icon-link">
    <a href="/admin/instructors/instructor-list.html">
        <i class="fas fa-user-tie fa-fw me-2"></i>
        <span class="link_name">Instructors</span>
    </a>
    <i class="bi bi-chevron-down arrow"></i>
   </div> 
   <ul class="sub-menu mt-1">
    <li><a class="link_name" href="/admin/instructors/instructor-list.html">Instructors</a></li>
        <li><a href="/admin/instructors/instructor-list.html">Instructors</a></li>
        <li><a href="/admin/instructors/admin-instructor-request.html">Instructors Requests <span class="badge bg-success" style="margin-left:5%;">4</span></a></li>
   </ul>
</li>
<li class="mt-2">
    <a href="/admin/review.html">
        <i class="far fa-comment-dots fa-fw me-2"></i>
        <span class="link_name">Reviews</span>
    </a>
    <ul class="sub-menu blank">
        <li><a class="link_name" href="/admin/review.html">Reviews</a></li>
    </ul>
</li>
<li class="mt-2 active-link text-white fw-bolder">
    <a href="/admin/adminSettings.html">
        <i class="fas fa-user-cog fa-fw me-2"></i>
        <span class="link_name">Admin Settings</span>
    </a>
    <ul class="sub-menu blank">
        <li><a class="link_name" href="/admin/adminSettings.html">Admin Settings</a></li>
    </ul>
</li>

<li class="mt-2">
    <div class="profile-details">
        <div class="profile-content">
            <img src="/assets/images/profile.jpg" alt="Profile Image" id="image">
        </div>
        <div class="name-job">
            <div class="profile_name" id="username"></div>
            <div class="" ><span id="userRole"  class="badge bg-success job"></span></div>
        </div>
        <i class="bi bi-box-arrow-righ"></i>
    </div>
    <ul class="sub-menu">
      <li><a class="link_name" href="#">Profile</a></li>
          <li><a><div class="profile_name" id="username2"></div></a></li>
          <li><a><div class="" ><span id="userRole2"  class="badge bg-success job"></span></div></a></li>
     </ul>
</li>
</ul>
`