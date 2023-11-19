const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))


// Get references to the elements
const profileDropdown = document.getElementById('profileDropdowns');
const dropdownMenu = document.getElementById('dropdown-menu');

// Add a click event listener to the <a> tag
profileDropdown.addEventListener('click', function (event) {
// Prevent the default behavior (e.g., following the href)
event.preventDefault();
console.log('clicked')
// Toggle the 'show' class on the dropdown menu
dropdownMenu.classList.toggle('show');
});
