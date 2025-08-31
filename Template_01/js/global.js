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