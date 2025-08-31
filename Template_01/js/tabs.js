// =============================================================================
// TABS FUNCTIONALITY FOR "HOW IT WORKS" SECTION
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tab functionality
    initMainTabs();
    initVerticalTabs();
});

// =============================================================================
// MAIN HORIZONTAL TABS (For Borrowers / For Lenders)
// =============================================================================

function initMainTabs() {
    const tabList = document.querySelector('.tabs-holder .tabs');
    const tabPanels = document.querySelectorAll('.tabs-holder .tab-content');
    
    if (!tabList || tabPanels.length === 0) return;
    
    const tabs = tabList.querySelectorAll('.tab');
    
    // Add click event listeners to each tab
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('tab-active'));
            tabPanels.forEach(panel => panel.classList.remove('tab-content-active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('tab-active');
            if (tabPanels[index]) {
                tabPanels[index].classList.add('tab-content-active');
            }
            
            // Update ARIA attributes for accessibility
            updateTabAccessibility(tab, tabPanels[index]);
        });
        
        // Set initial active state
        if (index === 0) {
            tab.classList.add('tab-active');
            if (tabPanels[index]) {
                tabPanels[index].classList.add('tab-content-active');
            }
        }
    });
}

// =============================================================================
// VERTICAL STEP TABS (Find & Select Labor, Raise PO, Sign & Pay)
// =============================================================================

function initVerticalTabs() {
    const verticalTabLists = document.querySelectorAll('.vertical-tabs .tabs');
    
    verticalTabLists.forEach(tabList => {
        const tabs = tabList.querySelectorAll('.tab');
        const tabPanels = tabList.closest('.vertical-tabs').querySelectorAll('.tab-content');
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all tabs in this vertical group
                tabs.forEach(t => t.classList.remove('tab-active'));
                
                // Remove active class from all panels in this vertical group
                tabPanels.forEach(panel => panel.classList.remove('tab-content-active'));
                
                // Add active class to clicked tab
                tab.classList.add('tab-active');
                
                // Add active class to corresponding panel
                if (tabPanels[index]) {
                    tabPanels[index].classList.add('tab-content-active');
                }
                
                // Update icon states (active = yellow, inactive = gray)
                updateIconStates(tabs, index);
                
                // Update ARIA attributes for accessibility
                updateVerticalTabAccessibility(tab, tabPanels[index]);
            });
            
            // Set initial active state for first tab
            if (index === 0) {
                tab.classList.add('tab-active');
                if (tabPanels[index]) {
                    tabPanels[index].classList.add('tab-content-active');
                }
            }
        });
        
        // Set initial icon states
        updateIconStates(tabs, 0);
    });
}

// =============================================================================
// ICON STATE MANAGEMENT
// =============================================================================

function updateIconStates(tabs, activeIndex) {
    tabs.forEach((tab, index) => {
        const icon = tab.querySelector('.icon svg');
        if (!icon) return;
        
        if (index === activeIndex) {
            // Active state - yellow color
            icon.style.filter = 'brightness(1) saturate(1.2)';
            // Update stroke color to yellow for circles
            const circle = icon.querySelector('circle');
            if (circle) {
                circle.setAttribute('stroke', '#FCD052');
            }
            // Update fill color for shield icon
            const shield = icon.querySelector('path[fill="#E5DBD2"]');
            if (shield) {
                shield.setAttribute('fill', '#FCD052');
            }
        } else {
            // Inactive state - gray color
            icon.style.filter = 'brightness(0.8) saturate(0.8)';
            // Update stroke color to gray for circles
            const circle = icon.querySelector('circle');
            if (circle) {
                circle.setAttribute('stroke', '#E5DBD2');
            }
            // Update fill color for shield icon
            const shield = icon.querySelector('path[fill="#FCD052"]');
            if (shield) {
                shield.setAttribute('fill', '#E5DBD2');
            }
        }
    });
}

// =============================================================================
// ACCESSIBILITY FUNCTIONS
// =============================================================================

function updateTabAccessibility(activeTab, activePanel) {
    const tabList = activeTab.closest('.tabs');
    const tabs = tabList.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tabs-holder .tab-content');
    
    // Update ARIA attributes for tabs
    tabs.forEach((tab, index) => {
        const isSelected = tab === activeTab;
        tab.setAttribute('aria-selected', isSelected);
        tab.setAttribute('aria-controls', `panel-${index}`);
        
        if (isSelected) {
            tab.setAttribute('tabindex', '0');
        } else {
            tab.setAttribute('tabindex', '-1');
        }
    });
    
    // Update ARIA attributes for panels
    panels.forEach((panel, index) => {
        const isVisible = panel === activePanel;
        panel.setAttribute('aria-hidden', !isVisible);
        panel.setAttribute('id', `panel-${index}`);
    });
}

function updateVerticalTabAccessibility(activeTab, activePanel) {
    const tabList = activeTab.closest('.tabs');
    const tabs = tabList.querySelectorAll('.tab');
    const panels = activeTab.closest('.vertical-tabs').querySelectorAll('.tab-content');
    
    // Update ARIA attributes for vertical tabs
    tabs.forEach((tab, index) => {
        const isSelected = tab === activeTab;
        tab.setAttribute('aria-selected', isSelected);
        tab.setAttribute('aria-controls', `vertical-panel-${index}`);
        
        if (isSelected) {
            tab.setAttribute('tabindex', '0');
        } else {
            tab.setAttribute('tabindex', '-1');
        }
    });
    
    // Update ARIA attributes for vertical panels
    panels.forEach((panel, index) => {
        const isVisible = panel === activePanel;
        panel.setAttribute('aria-hidden', !isVisible);
        panel.setAttribute('id', `vertical-panel-${index}`);
    });
}

// =============================================================================
// KEYBOARD NAVIGATION
// =============================================================================

function initKeyboardNavigation() {
    const tabLists = document.querySelectorAll('.tabs');
    
    tabLists.forEach(tabList => {
        const tabs = tabList.querySelectorAll('.tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('keydown', (e) => {
                const currentIndex = Array.from(tabs).indexOf(tab);
                let newIndex;
                
                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        newIndex = (currentIndex + 1) % tabs.length;
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
                        break;
                    case 'Home':
                        e.preventDefault();
                        newIndex = 0;
                        break;
                    case 'End':
                        e.preventDefault();
                        newIndex = tabs.length - 1;
                        break;
                    default:
                        return;
                }
                
                // Trigger click on the new tab
                tabs[newIndex].click();
                tabs[newIndex].focus();
            });
        });
    });
}

// =============================================================================
// AUTO-ROTATION FOR VERTICAL TABS (OPTIONAL)
// =============================================================================

function initAutoRotation() {
    const verticalTabLists = document.querySelectorAll('.vertical-tabs .tabs');
    
    verticalTabLists.forEach(tabList => {
        const tabs = tabList.querySelectorAll('.tab');
        let currentIndex = 0;
        let autoRotateInterval;
        
        // Start auto-rotation
        function startAutoRotation() {
            autoRotateInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % tabs.length;
                tabs[currentIndex].click();
            }, 5000); // Change every 5 seconds
        }
        
        // Stop auto-rotation
        function stopAutoRotation() {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
            }
        }
        
        // Pause auto-rotation on hover
        tabList.addEventListener('mouseenter', stopAutoRotation);
        tabList.addEventListener('mouseleave', startAutoRotation);
        
        // Pause auto-rotation on focus
        tabs.forEach(tab => {
            tab.addEventListener('focus', stopAutoRotation);
            tab.addEventListener('blur', startAutoRotation);
        });
        
        // Start auto-rotation initially
        startAutoRotation();
    });
}

// =============================================================================
// INITIALIZATION
// =============================================================================

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    initKeyboardNavigation();
    
    // Uncomment the line below if you want auto-rotation
    // initAutoRotation();
});

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Function to programmatically switch to a specific tab
function switchToTab(tabIndex, tabType = 'main') {
    if (tabType === 'main') {
        const tabs = document.querySelector('.tabs-holder .tabs');
        const tab = tabs?.querySelectorAll('.tab')[tabIndex];
        if (tab) tab.click();
    } else if (tabType === 'vertical') {
        const verticalTabs = document.querySelectorAll('.vertical-tabs .tabs');
        verticalTabs.forEach(tabList => {
            const tab = tabList.querySelectorAll('.tab')[tabIndex];
            if (tab) tab.click();
        });
    }
}

// Function to get current active tab index
function getActiveTabIndex(tabType = 'main') {
    if (tabType === 'main') {
        const tabs = document.querySelector('.tabs-holder .tabs');
        const activeTab = tabs?.querySelector('.tab-active');
        return activeTab ? Array.from(tabs.querySelectorAll('.tab')).indexOf(activeTab) : 0;
    } else if (tabType === 'vertical') {
        const verticalTabs = document.querySelector('.vertical-tabs .tabs');
        const activeTab = verticalTabs[0]?.querySelector('.tab-active');
        return activeTab ? Array.from(verticalTabs[0].querySelectorAll('.tab')).indexOf(activeTab) : 0;
    }
    return 0;
}

// Export functions for global use
window.TabsManager = {
    switchToTab,
    getActiveTabIndex,
    initMainTabs,
    initVerticalTabs
};
