// Navigation scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    // Function to handle scroll events
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if user is scrolling down
        if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
            // User is scrolling down and has scrolled more than 50px
            navbar.classList.add('scroll-down');
            navbar.classList.remove('scroll-up');
        } else if (currentScrollTop < lastScrollTop && currentScrollTop > 50) {
            // User is scrolling up and has scrolled more than 50px
            navbar.classList.add('scroll-up');
            navbar.classList.remove('scroll-down');
        } else if (currentScrollTop <= 50) {
            // User is near the top - remove both classes
            navbar.classList.remove('scroll-down', 'scroll-up');
        }
        
        lastScrollTop = currentScrollTop;
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on page load
    handleScroll();
});
