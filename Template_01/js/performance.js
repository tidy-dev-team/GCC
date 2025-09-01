// Performance optimization system
document.addEventListener('DOMContentLoaded', function() {
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize resource preloading
    initResourcePreloading();
});

// Performance optimization configuration
const performanceConfig = {
    lazyLoadThreshold: 0.1,
    preloadImages: true,
    optimizeAnimations: true,
    debounceScroll: true
};

// Initialize performance optimizations
function initPerformanceOptimizations() {
    // Optimize scroll events
    if (performanceConfig.debounceScroll) {
        optimizeScrollEvents();
    }
    
    // Optimize animations
    if (performanceConfig.optimizeAnimations) {
        optimizeAnimations();
    }
    
    // Add performance monitoring
    addPerformanceMonitoring();
}

// Optimize scroll events with debouncing
function optimizeScrollEvents() {
    let ticking = false;
    
    function updateScroll() {
        // Update scroll-based animations
        updateScrollAnimations();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
}

// Update scroll animations efficiently
function updateScrollAnimations() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Update parallax effects
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Update scroll progress indicators
    const progressElements = document.querySelectorAll('[data-scroll-progress]');
    progressElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        element.style.setProperty('--scroll-progress', progress);
    });
}

// Optimize animations for better performance
function optimizeAnimations() {
    // Use transform and opacity for animations
    const animatedElements = document.querySelectorAll('.scroll-animation');
    
    animatedElements.forEach(element => {
        // Force hardware acceleration
        element.style.willChange = 'transform, opacity';
        
        // Clean up after animation
        element.addEventListener('transitionend', function() {
            this.style.willChange = 'auto';
        });
    });
}

// Initialize lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            threshold: performanceConfig.lazyLoadThreshold,
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize resource preloading
function initResourcePreloading() {
    if (performanceConfig.preloadImages) {
        // Preload critical images
        const criticalImages = [
            'assets/images/Amel_logo.svg',
            'assets/images/accordion_image_1.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.as = 'style';
    criticalCSS.href = 'css/main.css';
    document.head.appendChild(criticalCSS);
}

// Add performance monitoring
function addPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Performance:', {
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                totalTime: perfData.loadEventEnd - perfData.fetchStart
            });
        }, 0);
    });
    
    // Monitor scroll performance
    let scrollCount = 0;
    let lastScrollTime = Date.now();
    
    window.addEventListener('scroll', function() {
        scrollCount++;
        const now = Date.now();
        
        if (now - lastScrollTime > 1000) {
            console.log('Scroll Performance:', {
                scrollsPerSecond: scrollCount,
                timestamp: now
            });
            scrollCount = 0;
            lastScrollTime = now;
        }
    }, { passive: true });
}

// Utility functions for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Memory management
function cleanupEventListeners() {
    // Remove event listeners when elements are removed
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Clean up any stored references
                    if (node._eventListeners) {
                        node._eventListeners.forEach(({event, handler}) => {
                            node.removeEventListener(event, handler);
                        });
                        delete node._eventListeners;
                    }
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Initialize memory management
document.addEventListener('DOMContentLoaded', function() {
    cleanupEventListeners();
});

// Performance utility functions
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
    return result;
}

function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading="lazy" for non-critical images
        if (!img.classList.contains('critical')) {
            img.loading = 'lazy';
        }
        
        // Add decoding="async" for better performance
        img.decoding = 'async';
    });
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', function() {
    optimizeImages();
});

// Export performance utilities for global use
window.PerformanceUtils = {
    throttle,
    debounce,
    measurePerformance,
    optimizeImages
};
