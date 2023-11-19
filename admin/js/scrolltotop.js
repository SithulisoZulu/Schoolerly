//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
   const topNav =  document.getElementById("topNav").classList.add("bg-dark-subtle", "rounded-3")
    if (window.innerWidth <= 767) { // You can adjust the width condition as needed
      topNav.classList.add('mt-3');
      topNav.classList.remove('mt-3');
  } else {
    mybutton.style.display = "none";
    document.getElementById("topNav").classList.remove("bg-dark-subtle", "rounded-3")
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
}