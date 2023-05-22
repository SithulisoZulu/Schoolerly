let arrow =  document.querySelectorAll(".arrow")

for (var i = 0; i < arrow.length; i++)
{
    arrow[i].addEventListener("click", (e)=>{
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
    });
}


let sidebar = document.querySelector(".sidebar");
let menuToggle = document.querySelector(".menuToggle");

console.log(menuToggle)

menuToggle.addEventListener("click", ()=>
{
    sidebar.classList.toggle("close")
}) ;


// Get all the li elements with nested ul
const liElements = document.querySelectorAll('.sidebar li');

// Attach click event listener to each arrow icon within li elements
liElements.forEach(li => {
  const arrowIcon = li.querySelector('.arrow');
  
  if (arrowIcon) {
    arrowIcon.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent event bubbling
      
      const parentLi = this.closest('li');
      parentLi.classList.toggle('open');
    });
  }
});
