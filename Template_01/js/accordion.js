
document.addEventListener('DOMContentLoaded', () => {


  window.addEventListener('scroll', function () {
    accordionElement = document.getElementsByClassName("accordion")[0]
    rect = accordionElement.getBoundingClientRect();

    if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0) {
      if (window.globalScroll !== false) {
        const ACCORDION_SELECTOR = '.accordion-block, .accordion-block-mobile';
        const instances = new WeakMap();

        const isVisible = (el) => {
          const cs = getComputedStyle(el);
          // Works for display:none and 0-size nodes too
          return cs.display !== 'none' && (el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length);
        };

        const initVisibleAccordions = () => {
          document.querySelectorAll(ACCORDION_SELECTOR).forEach(root => {
            const visible = isVisible(root);

            if (visible && !instances.get(root)) {
              instances.set(root, createAccordionInstance(root));
            }
            if (!visible && instances.get(root)) {
              instances.get(root).destroy();
              instances.delete(root);
            }
          });
        };

        let rAF = null;
        const onResize = () => {
          if (rAF) cancelAnimationFrame(rAF);
          rAF = requestAnimationFrame(initVisibleAccordions);
        };

        window.addEventListener('resize', onResize);
        initVisibleAccordions();

        // -------- Instance (scoped per root) --------
        function createAccordionInstance(root) {
          const headers = Array.from(root.querySelectorAll('.accordion-header-title'));
          if (!headers.length) return { destroy: () => { } };

          let contents = root.querySelectorAll('.accordion-content .accordion-content-item');
          if (!contents.length) {
            contents = root.querySelectorAll('.accordion-header-title .accordion-content-item'); // mobile fallback
          }
          contents = Array.from(contents);

          let currentIndex = headers.findIndex(h => h.classList.contains('active'));
          if (currentIndex < 0) currentIndex = 0;

          let progressBar = null;
          let progressInterval = null;

          const AUTO_CHANGE_DURATION = 5000;
          const FADE_DURATION = 500;

          const listeners = [];
          const on = (el, evt, fn) => { el.addEventListener(evt, fn); listeners.push(() => el.removeEventListener(evt, fn)); };

          const createProgressBar = () => {
            // remove any bar only inside this root
            root.querySelectorAll('.accordion-progress-bar').forEach(b => b.remove());

            const active = headers[currentIndex];
            if (!active) return;

            progressBar = document.createElement('div');
            progressBar.className = 'accordion-progress-bar';
            Object.assign(progressBar.style, {
              position: 'absolute', top: 0, left: 0, height: '2px',
              backgroundColor: '#1e1f24', width: '0%', zIndex: 1
            });
            active.style.position = 'relative';
            active.appendChild(progressBar);
          };

          const showItem = (idx) => {
            // Get previous before toggling
            const prevHeader = headers[currentIndex];
            const prevContent = contents[currentIndex];

            // Deactivate previous (with fade-out)
            if (prevHeader) prevHeader.classList.remove('active');
            if (prevContent) {
              prevContent.style.transition = `opacity ${FADE_DURATION}ms ease`;
              prevContent.style.opacity = '0';
              setTimeout(() => prevContent.classList.remove('active'), FADE_DURATION);
            }

            // Activate next (with fade-in)
            const nextHeader = headers[idx];
            const nextContent = contents[idx];

            if (nextHeader) nextHeader.classList.add('active');
            if (nextContent) {
              nextContent.classList.add('active');
              nextContent.style.opacity = '0';
              nextContent.style.transition = `opacity ${FADE_DURATION}ms ease`;
              requestAnimationFrame(() => { nextContent.style.opacity = '1'; });
            }

            currentIndex = idx;
            createProgressBar();
            startProgressBar();
          };

          const startProgressBar = () => {
            if (!progressBar) return;
            clearInterval(progressInterval);
            let progress = 0;
            progressBar.style.width = '0%';

            const step = AUTO_CHANGE_DURATION / 100;
            progressInterval = setInterval(() => {
              if (!progressBar) return;
              progress += 1;
              progressBar.style.width = progress + '%';
              if (progress >= 100) {
                clearInterval(progressInterval);
                // ✅ FIXED: no assignment inside the call
                showItem((currentIndex + 1) % headers.length);
              }
            }, step);
          };

          // Wire clicks (scoped)
          headers.forEach((h, i) => on(h, 'click', () => showItem(i)));

          // Hover pause/resume (scoped)
          on(root, 'mouseenter', () => clearInterval(progressInterval));
          on(root, 'mouseleave', () => { createProgressBar(); startProgressBar(); });

          // Ensure a clean single active at start
          headers.forEach((h, i) => i === currentIndex ? h.classList.add('active') : h.classList.remove('active'));
          contents.forEach((c, i) => i === currentIndex ? c.classList.add('active') : c.classList.remove('active'));

          // Initial
          createProgressBar();
          startProgressBar();

          // Cleanup
          const destroy = () => {
            clearInterval(progressInterval);
            listeners.forEach(off => off());
            root.querySelectorAll('.accordion-progress-bar').forEach(b => b.remove());
          };
          window.globalScroll = false;
          console.log('false');

          return { destroy };
        }
      }
    }
  });

});