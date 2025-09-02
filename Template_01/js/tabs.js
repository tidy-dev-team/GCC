// =============================================================================
// SIMPLE TABS FUNCTIONALITY (outer + nested vertical tabs)
// =============================================================================
document.addEventListener('DOMContentLoaded', initTabs);

function initTabs() {
  initOuterTabs();
  initVerticalTabs();
}

/**
 * OUTER TABS: "For Borrowers" / "For Lenders"
 * Only target direct children of .tabs-holder
 */
function initOuterTabs() {
  const holder = document.querySelector('.tabs-holder');
  if (!holder) return;

  const tablist = holder.querySelector('.tabs-holder > .tabs[role="tablist"]');
  if (!tablist) return;

  const tabs   = tablist.querySelectorAll('[role="tab"].tab');
  const panels = holder.querySelectorAll('.tabs-holder > [role="tabpanel"].tab-content');

  // Delegate clicks only from the outer tablist
  tablist.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"].tab');
    if (!tab || !tablist.contains(tab)) return;

    e.preventDefault(); // avoid hash smooth-scroll if href present

    // clear actives
    tabs.forEach(t => {
      t.classList.remove('tab-active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    panels.forEach(p => p.classList.remove('tab-content-active'));

    // activate clicked + its panel (by aria-controls)
    tab.classList.add('tab-active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');

    const id = tab.getAttribute('aria-controls');
    const panel = id ? document.getElementById(id) : null;
    if (panel) panel.classList.add('tab-content-active');
  });
}

/**
 * VERTICAL (NESTED) TABS inside each outer panel
 * Each .vertical-tabs group manages itself
 */
function initVerticalTabs() {
  const groups = document.querySelectorAll('.vertical-tabs');

  groups.forEach((group) => {
    const tablist = group.querySelector('.vertical-tabs-holder .tabs[role="tablist"], .vertical-tabs-holder .tabs');
    const contentHolder = group.querySelector('.tab-content-holder');
    if (!tablist || !contentHolder) return;

    const tabs   = tablist.querySelectorAll('[role="tab"].tab');
    const panels = contentHolder.querySelectorAll('[role="tabpanel"].tab-content');

    // Optional: ensure one default active per group
    if (![...tabs].some(t => t.classList.contains('tab-active')) && tabs[0]) {
      tabs[0].classList.add('tab-active');
      tabs[0].setAttribute('aria-selected', 'true');
      tabs[0].setAttribute('tabindex', '0');
      if (panels[0]) panels[0].classList.add('tab-content-active');
    }

    tablist.addEventListener('click', (e) => {
      const tab = e.target.closest('[role="tab"].tab');
      if (!tab || !tablist.contains(tab)) return;

      e.preventDefault();

      // reset only within this group
      tabs.forEach(t => {
        t.classList.remove('tab-active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      panels.forEach(p => p.classList.remove('tab-content-active'));

      // activate clicked tab
      tab.classList.add('tab-active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');

      // If you add aria-controls on vertical tabs, use it:
      const id = tab.getAttribute('aria-controls');
      if (id) {
        const panel = contentHolder.querySelector(`#${CSS.escape(id)}`);
        if (panel) panel.classList.add('tab-content-active');
      } else {
        // fallback: index-based mapping
        const idx = [...tabs].indexOf(tab);
        if (idx > -1 && panels[idx]) panels[idx].classList.add('tab-content-active');
      }
    });
  });
}
