// Scroll animations system
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations(); 
});
 
 
function initScrollAnimations() {
    
   // addScrollTriggeredAnimations();
   // initIntersectionObserver
}
  
function addScrollTriggeredAnimations() {
     
     
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled > 100) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }
} 
 
 