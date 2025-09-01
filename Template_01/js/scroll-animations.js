// Scroll animations system
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize intersection observer for animations
    initIntersectionObserver();
});

// Scroll animations configuration
const animationConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    animationClasses: {
        fadeIn: 'animate-fade-in',
        slideInLeft: 'animate-slide-in-left',
        slideInRight: 'animate-slide-in-right',
        slideInUp: 'animate-slide-in-up',
        scaleIn: 'animate-scale-in',
        bounceIn: 'animate-bounce-in'
    }
};

// Initialize scroll animations
function initScrollAnimations() {
    // Add animation classes to elements
    addAnimationClasses();
    
    // Add scroll-triggered animations
    addScrollTriggeredAnimations();
}

// Add animation classes to elements
function addAnimationClasses() {
    // Skip the hero section - don't add animations to it
    const sections = document.querySelectorAll('section:not(.hero-video)');
    sections.forEach((section, index) => {
        // Don't add scroll animations to sections
        // section.classList.add('scroll-animation');
        // section.setAttribute('data-animation-delay', index * 0.2);
    });
    
    // Add slide-in animations to cards (but not in hero section)
    const cards = document.querySelectorAll('.card:not(.hero-video .card)');
    cards.forEach((card, index) => {
        card.classList.add('scroll-animation', 'animate-slide-in-up');
        card.setAttribute('data-animation-delay', index * 0.1);
    });
    
    // Add scale animations to images (but not in hero section)
    // DISABLED: Image animations removed per user request
    // const images = document.querySelectorAll('img:not(.hero-video img)');
    // images.forEach(img => {
    //     img.classList.add('scroll-animation', 'animate-scale-in');
    // });
    
    // Add bounce animations to buttons (but not in hero section)
    // DISABLED: Button animations removed per user request
    // const buttons = document.querySelectorAll('.btn:not(.hero-video .btn), .hero-btn:not(.hero-video .hero-btn)');
    // buttons.forEach(button => {
    //     button.classList.add('scroll-animation', 'animate-bounce-in');
    // });
}

// Add scroll-triggered animations
function addScrollTriggeredAnimations() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-video');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Sticky header effect
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

// Initialize intersection observer
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.scroll-animation');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-animation-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay * 1000);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: animationConfig.threshold,
        rootMargin: animationConfig.rootMargin
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Base animation classes */
    .scroll-animation {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .scroll-animation.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Fade in animation */
    .animate-fade-in {
        opacity: 0;
        transition: opacity 0.8s ease-out;
    }
    
    .animate-fade-in.animated {
        opacity: 1;
    }
    
    /* Slide in from left */
    .animate-slide-in-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.8s ease-out;
    }
    
    .animate-slide-in-left.animated {
        opacity: 1;
        transform: translateX(0);
    }
    
    /* Slide in from right */
    .animate-slide-in-right {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.8s ease-out;
    }
    
    .animate-slide-in-right.animated {
        opacity: 1;
        transform: translateX(0);
    }
    
    /* Slide in from bottom */
    .animate-slide-in-up {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    
    .animate-slide-in-up.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Scale in animation */
    .animate-scale-in {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.8s ease-out;
    }
    
    .animate-scale-in.animated {
        opacity: 1;
        transform: scale(1);
    }
    
    /* Bounce in animation */
    .animate-bounce-in {
        opacity: 0;
        transform: scale(0.3);
        transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .animate-bounce-in.animated {
        opacity: 1;
        transform: scale(1);
    }
    
    /* Sticky navbar */
    .navbar.sticky {
        background-color: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(15px);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
        padding: 1rem 1.5rem;
    }
    
    /* Smooth reveal for sections */
    section {
        position: relative;
        overflow: hidden;
    }
    
    /* Progressive reveal for lists */
    .list li {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .list.animated li {
        opacity: 1;
        transform: translateY(0);
    }
    
    .list.animated li:nth-child(1) { transition-delay: 0.1s; }
    .list.animated li:nth-child(2) { transition-delay: 0.2s; }
    .list.animated li:nth-child(3) { transition-delay: 0.3s; }
    .list.animated li:nth-child(4) { transition-delay: 0.4s; }
    .list.animated li:nth-child(5) { transition-delay: 0.5s; }
    .list.animated li:nth-child(6) { transition-delay: 0.6s; }
    
    /* Disable animations for trusted-block */
    .trusted-block .list li {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: none !important;
    }
    
    .trusted-block .list.animated li {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .trusted-block .list.animated li:nth-child(1),
    .trusted-block .list.animated li:nth-child(2),
    .trusted-block .list.animated li:nth-child(3),
    .trusted-block .list.animated li:nth-child(4),
    .trusted-block .list.animated li:nth-child(5),
    .trusted-block .list.animated li:nth-child(6) {
        transition-delay: 0s !important;
    }
    
    /* Disable animations for buttons */
    .btn, .hero-btn {
        opacity: 1 !important;
        transform: scale(1) !important;
        transition: none !important;
    }
    
    .btn.animate-bounce-in,
    .hero-btn.animate-bounce-in {
        opacity: 1 !important;
        transform: scale(1) !important;
    }
    
    .btn.scroll-animation,
    .hero-btn.scroll-animation {
        opacity: 1 !important;
        transform: scale(1) !important;
    }
    
    /* Disable animations for images */
    img {
        opacity: 1 !important;
        transform: scale(1) !important;
        transition: none !important;
    }
    
    img.animate-scale-in {
        opacity: 1 !important;
        transform: scale(1) !important;
    }
    
    img.scroll-animation {
        opacity: 1 !important;
        transform: scale(1) !important;
    }
    
    /* Text reveal animation */
    .text-reveal {
        overflow: hidden;
    }
    
    .text-reveal h1,
    .text-reveal h2,
    .text-reveal h3,
    .text-reveal p {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .text-reveal.animated h1,
    .text-reveal.animated h2,
    .text-reveal.animated h3,
    .text-reveal.animated p {
        opacity: 1;
        transform: translateY(0);
    }
    
    .text-reveal.animated h1 { transition-delay: 0.1s; }
    .text-reveal.animated h2 { transition-delay: 0.2s; }
    .text-reveal.animated h3 { transition-delay: 0.3s; }
    .text-reveal.animated p { transition-delay: 0.4s; }
    
    /* Loading animation */
    .loading-animation {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    /* Hover animations */
    .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hover-lift:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .hover-scale {
        transition: transform 0.3s ease;
    }
    
    .hover-scale:hover {
        transform: scale(1.05);
    }
    
    /* Pulse animation for CTAs */
    .pulse-cta {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 204, 35, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(255, 204, 35, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 204, 35, 0);
        }
    }
`;

document.head.appendChild(animationStyles);

// Utility functions for manual animation triggering
function triggerAnimation(element, animationType = 'fade-in') {
    element.classList.add('scroll-animation', `animate-${animationType}`);
    element.classList.add('animated');
}

function triggerSectionAnimation(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('animated');
    }
}

function addHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Add hover effects to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('hover-scale');
    });
    
    // Add pulse effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn:contains("Partner with Us"), .hero-btn');
    ctaButtons.forEach(button => {
        button.classList.add('pulse-cta');
    });
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', function() {
    addHoverEffects();
});
