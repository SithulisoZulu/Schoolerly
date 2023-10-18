const nav = document.getElementById("smallNav")
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
  };
  
  function scrollFunction() {
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      document.getElementById("nav").classList.remove("bg-dark-subtle")
      document.getElementById("nav").classList.add("bg-dark")
    } else {
      document.getElementById("topNav").classList.remove("bg-dark-subtle", "rounded-3")
    }
  }