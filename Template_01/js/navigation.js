// Navigation scroll functionality
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    // Function to handle scroll events
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Check if user is scrolling down
        if (currentScrollTop > lastScrollTop && currentScrollTop > 900) {
            // User is scrolling down and has scrolled more than 50px
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }

        if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
            // User is scrolling up and has scrolled more than 50px
            // navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        }

        if (currentScrollTop < lastScrollTop && currentScrollTop > 50) {
            // User is scrolling up and has scrolled more than 50px
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        }

        if (currentScrollTop <= 50) {
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

function closeNav() {
    document.getElementById("mobileMenu").removeAttribute('open');
    // var x = document.querySelectorAll('details');
    // var i;
    // for (i = 0; i < x.length; i++) {
    //     x[i].removeAttribute('open');
    // }
}