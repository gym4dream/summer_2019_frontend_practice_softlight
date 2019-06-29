import "./scss/blog.scss";

console.log("This is a project's blog.");

window.onload = function(){ 
  const mobileMenuIcon = document.querySelector('.mobile-menu');
  const mobileMenuList = document.getElementById('mobileMenuList');
  
  mobileMenuIcon.addEventListener('click', function() {
    mobileMenuList.classList.toggle('mobile-navigation');
  });
};

