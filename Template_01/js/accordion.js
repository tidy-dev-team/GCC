document.addEventListener('DOMContentLoaded', () => {
  const ACCORDION_SELECTOR = '.accordion-block, .accordion-block-mobile';
  const instances = new WeakMap();

  
  document.querySelectorAll(ACCORDION_SELECTOR).forEach(root => {
    instances.set(root, createAccordionInstance(root));
  });

  
  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const inst = instances.get(entry.target);
      if (inst) inst.startIfNotStarted();
      io.unobserve(entry.target); 
    }
  }, { threshold: 0.2 });

  document.querySelectorAll(ACCORDION_SELECTOR).forEach(el => io.observe(el));

  
  function createAccordionInstance(root) {
    const headers = Array.from(root.querySelectorAll('.accordion-header-title'));
    if (!headers.length) return { startIfNotStarted(){} };

    let contents = root.querySelectorAll('.accordion-content .accordion-content-item');
    if (!contents.length) {
  
      contents = root.querySelectorAll('.accordion-header-title .accordion-content-item');
    }
    contents = Array.from(contents);

  
    const clampIndex = idx => (idx + headers.length) % headers.length;

    let currentIndex = headers.findIndex(h => h.classList.contains('active'));
    if (currentIndex < 0) currentIndex = 0;

  
  
    const DURATION = 5000; 

    
    let progressBar = null;
    let progressInterval = null;
    let started = false;

    
    headers.forEach((h, i) => h.classList.toggle('active', i === currentIndex));
    contents.forEach((c, i) => c.classList.toggle('active', i === currentIndex));

    
    const createBar = () => {
    
      root.querySelectorAll('.accordion-progress-bar').forEach(b => b.remove());

      const holder = headers[currentIndex];
      if (!holder) return;

      progressBar = document.createElement('div');
      progressBar.className = 'accordion-progress-bar';
      Object.assign(progressBar.style, {
        position: 'absolute',
        top: 0, left: 0,
        height: '2px',
        width: '0%',
        backgroundColor: '#1e1f24',
        zIndex: 1
      });
      if (getComputedStyle(holder).position === 'static') {
        holder.style.position = 'relative';
      }
      holder.appendChild(progressBar);
    };

    const stopProgress = () => {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    };

    
    const startProgress = () => {
      stopProgress();
      if (!progressBar) createBar();
      if (!progressBar) return;

      let pct = 0;
      progressBar.style.width = '0%';
      const step = Math.max(10, Math.floor(DURATION / 100));  

      progressInterval = setInterval(() => {
        if (!progressBar) return;
        pct += 1;
        progressBar.style.width = pct + '%';

        if (pct >= 100) {
          
          stopProgress();
          switchTo(clampIndex(currentIndex + 1));
        }
      }, step);
    };

    const switchTo = (idx) => {
      idx = clampIndex(idx);
      if (idx === currentIndex) return;

       
      headers[currentIndex]?.classList.remove('active');
      contents[currentIndex]?.classList.remove('active');

      currentIndex = idx;

       
      headers[currentIndex]?.classList.add('active');
      contents[currentIndex]?.classList.add('active');

     
      createBar();
      startProgress();
    };

    
    headers.forEach((h, i) => h.addEventListener('click', () => {
      stopProgress();
      switchTo(i);
    }));

    
    const startIfNotStarted = () => {
      if (started) return;
      started = true;
      createBar();
      startProgress();
    };

    return { startIfNotStarted };
  }
});
