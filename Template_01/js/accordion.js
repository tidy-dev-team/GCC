// Accordion functionality with auto-change and progress bar
document.addEventListener('DOMContentLoaded', function() {
    const accordionBlock = document.querySelector('.accordion-block');
    
    if (!accordionBlock) return;
    
    const accordionHeaders = accordionBlock.querySelectorAll('.accordion-header-title');
    const accordionContentItems = accordionBlock.querySelectorAll('.accordion-content-item');
    
    let currentIndex = 0;
    let autoChangeInterval;
    let progressInterval;
    let isUserInteracting = false;
    let progressBar;
    
    // Configuration
    const AUTO_CHANGE_DURATION = 5000; // 5 seconds (reduced delay)
    const PROGRESS_UPDATE_INTERVAL = 50; // Update progress every 50ms (less frequent updates)
    const FADE_DURATION = 500; // Fade transition duration
    
    // Initialize accordion
    function initAccordion() {
        // Create progress bar element
        createProgressBar();
        
        // Add click event listeners to headers
        accordionHeaders.forEach((header, index) => {
            header.addEventListener('click', () => handleHeaderClick(index));
        });
        
        // Start auto-change
        startAutoChange();
    }
    
    // Create progress bar element
    function createProgressBar() {
        const activeHeader = accordionBlock.querySelector('.accordion-header-title.active');
        if (activeHeader) {
            // Create progress bar element
            progressBar = document.createElement('div');
            progressBar.className = 'accordion-progress-bar';
            progressBar.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                height: 2px;
                background-color: #1e1f24;
                width: 0%;
                transition: width 0.3s ease-out;
                z-index: 1;
            `;
            
            // Insert progress bar before the ::before pseudo-element
            activeHeader.style.position = 'relative';
            activeHeader.appendChild(progressBar);
        }
    }
    
    // Handle header click
    function handleHeaderClick(index) {
        // Clear any existing intervals
        clearInterval(autoChangeInterval);
        clearInterval(progressInterval);
        
        // Show the new accordion item
        showAccordionItem(index);
        
        // Start fresh progress bar from 0
        startProgressBar();
    }
    
    // Show specific accordion item with fade effect
    function showAccordionItem(index) {
        // Remove active class from all headers and content items
        accordionHeaders.forEach(header => header.classList.remove('active'));
        accordionContentItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to selected header and content
        accordionHeaders[index].classList.add('active');
        
        // Fade out current content
        const currentActiveContent = accordionBlock.querySelector('.accordion-content-item.active');
        if (currentActiveContent) {
            currentActiveContent.style.opacity = '0';
            currentActiveContent.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
        }
        
        // Fade in new content
        setTimeout(() => {
            accordionContentItems[index].classList.add('active');
            accordionContentItems[index].style.opacity = '0';
            accordionContentItems[index].style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
            
            setTimeout(() => {
                accordionContentItems[index].style.opacity = '1';
            }, 10);
        }, FADE_DURATION / 2);
        
        // Update progress bar
        updateProgressBar(index);
        
        currentIndex = index;
    }
    
    // Update progress bar position
    function updateProgressBar(index) {
        // Remove existing progress bar
        const existingProgressBar = accordionBlock.querySelector('.accordion-progress-bar');
        if (existingProgressBar) {
            existingProgressBar.remove();
        }
        
        // Create new progress bar for active header
        const activeHeader = accordionHeaders[index];
        progressBar = document.createElement('div');
        progressBar.className = 'accordion-progress-bar';
        progressBar.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            height: 2px;
            background-color: #1e1f24;
            width: 0%;
            z-index: 1;
        `;
        
        activeHeader.style.position = 'relative';
        activeHeader.appendChild(progressBar);
    }
    
    // Start auto-change functionality
    function startAutoChange() {
        clearInterval(autoChangeInterval);
        clearInterval(progressInterval);
        
        // Start progress bar animation
        startProgressBar();
        
        // Don't set up auto-change interval - let progress bar control the timing
        // The progress bar will trigger the change when it reaches 100%
    }
    
    // Start progress bar animation using simple JavaScript
    function startProgressBar() {
        // Ensure progress bar exists
        if (!progressBar) return;
        
        // Clear any existing interval
        clearInterval(progressInterval);
        
        // Reset progress to 0
        let progress = 0;
        progressBar.style.width = '0%';
        
        // Simple interval for smooth progress
        progressInterval = setInterval(() => {
            if (progressBar) {
                progress += 1;
                progressBar.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    
                    // Progress complete, change accordion
                    currentIndex = (currentIndex + 1) % accordionHeaders.length;
                    showAccordionItem(currentIndex);
                    
                    // Start new progress bar
                    setTimeout(() => {
                        startProgressBar();
                    }, 200);
                }
            }
        }, AUTO_CHANGE_DURATION / 100); // Update every 1% of total duration
    }
    
    // Restart auto-change (called when user interacts)
    function restartAutoChange() {
        isUserInteracting = false;
        setTimeout(() => {
            startAutoChange();
        }, 500); // Wait 0.5 seconds before restarting auto-change
    }
    
    // Pause auto-change when user hovers over accordion
    function pauseOnHover() {
        accordionBlock.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            clearInterval(autoChangeInterval);
            clearInterval(progressInterval);
        });
        
        accordionBlock.addEventListener('mouseleave', () => {
            setTimeout(() => {
                isUserInteracting = false;
                startAutoChange();
            }, 500); // Shorter delay for hover pause
        });
    }
    
    // Initialize everything
    initAccordion();
    pauseOnHover();
});
