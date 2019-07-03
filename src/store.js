import "./scss/store.scss";

console.log("This is a project's store.");

window.onload = function(){ 
  const mobileMenuIcon = document.querySelector('.mobile-menu');
  const mobileMenuList = document.getElementById('mobileMenuList');
  const mobileHeader = document.querySelector('.page-header');
  
  mobileMenuIcon.addEventListener('click', function() {
    mobileMenuList.classList.toggle('mobile-navigation');
    mobileHeader.classList.toggle('page-header-margin-bottom');
    });
};
