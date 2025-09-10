class HeroVideoEntrance {
    constructor() {
        this.videoElement = document.querySelector('#mainVideo');
        this.contentElement = document.querySelector('#heroContent');
        this.heroSection = document.querySelector('.hero-video');
        this.video = document.querySelector('#heroVideoElement');
        this.loadingElement = document.querySelector('.loading');
        this.videoSources = [
            'assets/video/Hero1.mp4',  
            'assets/video/Hero4.mp4', 
            'assets/video/Hero6.mp4',
        ];
        this.currentVideoIndex = 0;
        this.fillScreenTriggered = false;
        this.isTransitioning = false;
        this.entranceComplete = false;
        
        this.init();
    }
    
    init() {
        // Start entrance animation
        this.videoElement.classList.add('animate-in');
        
        // Set up video end detection
        this.setupVideoEndDetection();
        
        // Ensure video is playing
        if (this.video.paused) {
            this.video.play();
        }
        
        // Mark entrance as complete after animation
        setTimeout(() => {
            this.entranceComplete = true;
            // Hide loading spinner
            if (this.loadingElement) {
                this.loadingElement.style.display = 'none';
            }
        }, 1200);
    }
    
    // Handle video time update to detect end
    handleVideoTimeUpdate = () => {
        if (this.video.duration && this.video.currentTime) {
            const timeRemaining = this.video.duration - this.video.currentTime;
            
            if (timeRemaining < 1.0 && this.contentElement.classList.contains('animate-in') && this.fillScreenTriggered) {
                this.startFadeTransition();
            }
        }
    }
    
    // Set up video end detection
    setupVideoEndDetection() {
        this.video.addEventListener('timeupdate', this.handleVideoTimeUpdate);
        this.video.addEventListener('ended', this.handleVideoEnded);
    }
    
    
    // Trigger fill screen animation
    triggerFillScreen() {
        if (this.fillScreenTriggered || !this.entranceComplete) return;
        
        this.fillScreenTriggered = true;
        console.log('🎬 Starting fill-screen animation...');
        
        // Ensure video continues playing
        if (this.video.paused) {
            this.video.play();
        }
        
        // Add fill-screen class and update Tailwind classes
        this.videoElement.classList.add('fill-screen');
        this.videoElement.classList.remove('scale-75', 'translate-y-full');
        this.videoElement.classList.add('scale-100');
        
        // Start continuous video monitoring during fill animation
        this.startFillAnimationMonitoring();
        
        // Trigger content fade-in during fill animation (not after)
        setTimeout(() => {
            this.contentElement.classList.add('animate-in');
            this.contentElement.classList.remove('opacity-0', 'translate-y-8');
            this.contentElement.classList.add('opacity-100', 'translate-y-0');
            console.log('🎬 Content fade-in started (during fill animation)');
            
            // Stop fill monitoring and start content monitoring
            this.stopFillAnimationMonitoring();
            this.startContentMonitoring();
        }, 500); // Content starts fading in at 0.5 seconds (early in fill animation)
    }
    
    // Monitor video during fill animation to prevent stopping
    startFillAnimationMonitoring() {
        console.log('🔧 Starting fill animation monitoring...');
        
        // Temporarily disable CSS transitions that might interfere
        this.video.style.transition = 'none';
        
        this.fillMonitorInterval = setInterval(() => {
            if (this.video.paused && this.video.readyState >= 2) {
                console.log('🎬 Video paused during fill animation, resuming...');
                this.video.play().catch(() => {
                    // Silent fail to avoid console spam
                });
            }
        }, 100); // Check every 100ms
        
        // Re-enable transitions after fill animation
        setTimeout(() => {
            this.video.style.transition = '';
        }, 2000);
    }
    
    // Stop fill animation monitoring
    stopFillAnimationMonitoring() {
        if (this.fillMonitorInterval) {
            clearInterval(this.fillMonitorInterval);
            this.fillMonitorInterval = null;
            console.log('🔧 Fill animation monitoring stopped');
        }
    }
    
    // Monitor video after content appears
    startContentMonitoring() {
        console.log('🔧 Starting content monitoring...');
        
        this.contentMonitorInterval = setInterval(() => {
            if (this.contentElement.classList.contains('animate-in') && 
                this.fillScreenTriggered && 
                !this.isTransitioning) {
                
                if (this.video.paused && this.video.readyState >= 2) {
                    console.log('🎬 Video paused after content, resuming...');
                    this.video.play().catch(() => {
                        // Silent fail to avoid console spam
                    });
                }
            }
        }, 500); // Check every 500ms
    }
    
    // Stop content monitoring
    stopContentMonitoring() {
        if (this.contentMonitorInterval) {
            clearInterval(this.contentMonitorInterval);
            this.contentMonitorInterval = null;
            console.log('🔧 Content monitoring stopped');
        }
    }
    
    // Replay animation
    replayAnimation() {
        // Stop all monitoring
        this.stopFillAnimationMonitoring();
        this.stopContentMonitoring();
        
        this.fillScreenTriggered = false;
        this.isTransitioning = false;
        this.entranceComplete = false;
        
        // Reset video element classes
        this.videoElement.classList.remove('animate-in', 'fill-screen', 'scale-100');
        this.videoElement.classList.add('scale-75', 'translate-y-1/4');
        
        // Reset content element classes
        this.contentElement.classList.remove('animate-in', 'opacity-100', 'translate-y-0');
        this.contentElement.classList.add('opacity-0', 'translate-y-8');
        
        // Reset video
        this.video.style.opacity = '1';
        this.video.currentTime = 0;
        this.video.play();
        
        // Show loading spinner
        if (this.loadingElement) {
            this.loadingElement.style.display = 'block';
        }
        
        setTimeout(() => {
            this.videoElement.classList.add('animate-in');
            this.videoElement.classList.remove('scale-75', 'translate-y-1/4');
            this.videoElement.classList.add('scale-80');
            setTimeout(() => {
                this.entranceComplete = true;
                if (this.loadingElement) {
                    this.loadingElement.style.display = 'none';
                }
            }, 10);
        }, 10);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.heroEntrance = new HeroVideoEntrance();
});

// Scroll trigger for fill screen
window.addEventListener('scroll', () => {
    if (window.heroEntrance && !window.heroEntrance.fillScreenTriggered && window.heroEntrance.entranceComplete) {
        window.heroEntrance.triggerFillScreen();
    }
});

// Auto-trigger fill screen after entrance animation (fallback)
setTimeout(() => {
    if (window.heroEntrance && !window.heroEntrance.fillScreenTriggered) {
        window.heroEntrance.triggerFillScreen();
    }
}, 2000);
