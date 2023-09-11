/*===============
   Global Variables
===============*/

let body = document.body;
let darkmode = "dark-mode";

/*=================
   Dark Mode Feature
=================*/

function darkMode() {
    body.classList.toggle(darkmode);
  
    // Caching dark mode setting to local storage
    if (body.classList == darkmode) {
      localStorage.setItem("ui", darkmode);
    } else {
      localStorage.removeItem("ui");
    }
  
    // Adds the dark mode class to the body tag
    if (localStorage.getItem("ui")) {
      body.classList.add(darkmode);
    }
}