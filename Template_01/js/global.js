// Global utility functions
function replayEntranceAnimation() {
    if (window.heroEntrance) {
        window.heroEntrance.replayAnimation();
    }
}

function triggerFillScreen() {
    if (window.heroEntrance) {
        window.heroEntrance.triggerFillScreen();
    }
}

function triggerNextVideo() {
    if (window.heroEntrance) {
        window.heroEntrance.startFadeTransition();
    }
}

function showVideoStatus() {
    if (window.heroEntrance) {
        const video = window.heroEntrance.video;
        const status = {
            currentTime: video.currentTime?.toFixed(2) || 'N/A',
            duration: video.duration?.toFixed(2) || 'N/A',
            paused: video.paused,
            readyState: video.readyState,
            src: video.src
        };
        console.log('Video Status:', status);
        alert(`Video Status:\nCurrent Time: ${status.currentTime}s\nDuration: ${status.duration}s\nPaused: ${status.paused}\nReady State: ${status.readyState}`);
    }
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize button interactions
    initButtonInteractions();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize form handling
   // initFormHandling();
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
        const label = dropdown.querySelector('.menu-label');
        const menu  = dropdown.querySelector('.dropdown-content');
        if (!label || !menu) return;
    
        const iconHamb  = label.querySelector('.icon-hamburger');
        const iconClose = label.querySelector('.icon-close');
    
        function setOpen(isOpen) {
          // DaisyUI shows menu when .dropdown-open is present
          dropdown.classList.toggle('dropdown-open', isOpen);
          label.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          if (iconHamb)  iconHamb.classList.toggle('hidden', isOpen);
          if (iconClose) iconClose.classList.toggle('hidden', !isOpen);
        }
    
        // Toggle on click
        label.addEventListener('click', (e) => {
          e.preventDefault();
          setOpen(!dropdown.classList.contains('dropdown-open'));
        });
    
        // Close on outside click
        document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target)) setOpen(false);
        });
    
        // Close on Esc
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') setOpen(false);
        });
      });
    
    
});

// Button interaction system
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn, .hero-btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
            
            // Add click animation
            //this.style.transform = 'scale(0.95)';
            setTimeout(() => {
              //  this.style.transform = 'scale(1)';
            }, 150);
            
            // Handle specific button actions
            handleButtonAction(this);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
           // this.style.transform = 'translateY(-2px)';
           // this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
         //   this.style.transform = 'translateY(0)';
          //  this.style.boxShadow = '';
        });
        
        // Add focus effects for accessibility
        button.addEventListener('focus', function() {
      //      this.style.outline = '2px solid #ffcc23';
        //    this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
         //   this.style.outline = '';
         //   this.style.outlineOffset = '';
        });
    });
}

// Create ripple effect on button click
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Handle specific button actions
function handleButtonAction(button) {
    const buttonText = button.textContent.trim().toLowerCase();
    
    switch(buttonText) {
        case 'partner with us':
            // Scroll to contact section or open contact form
          //  scrollToSection('contact') || showContactForm();
            break;
        case 'login':
            // Open login modal or redirect to login page
          //  showLoginModal();
            break;
        default:
            // Default action - could be form submission or navigation
            console.log('Button clicked:', buttonText);
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Add input focus effects
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
    }
    return false;
}

function showContactForm() {
    // Create and show contact form modal
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Contact Us</h3>
            <form>
                <input type="text" placeholder="Name" required>
                <input type="email" placeholder="Email" required>
                <textarea placeholder="Message" required></textarea>
                <button type="submit" class="btn">Send Message</button>
            </form>
            <button class="close-btn">&times;</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function showLoginModal() {
    // Create and show login modal
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Login</h3>
            <form>
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Password" required>
                <button type="submit" class="btn">Login</button>
            </form>
            <button class="close-btn">&times;</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        console.log('Form submitted:', data);
        
        // Show success message
        showNotification('Form submitted successfully!', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .contact-modal,
    .login-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        position: relative;
        max-width: 500px;
        width: 90%;
    }
    
    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    .modal-content form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .modal-content input,
    .modal-content textarea {
        padding: 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.25rem;
    }
`;
document.head.appendChild(style);