/**
 * Handles changing and persisting the theme (color and style) using localStorage.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const colorButtons = document.querySelectorAll('.color-btn');
    const root = document.documentElement;
    const styleToggle = document.getElementById('style-toggle');
    const defaultSheet = document.getElementById('default-stylesheet');
    const glassSheet = document.getElementById('glass-stylesheet');

    // --- Storage Keys ---
    const colorStorageKey = 'primaryThemeColor';
    const styleStorageKey = 'selectedStylesheet';

    // --- State ---
    let randomColorInterval = null; // To hold the interval ID

    // --- Color Functions ---
    // Function to apply a color to the theme
    const applyColor = (color) => {
        root.style.setProperty('--primary-color', color);
    };

    // Function to stop any ongoing color animation
    const stopRandomAnimation = () => {
        if (randomColorInterval) {
            clearInterval(randomColorInterval);
            randomColorInterval = null;
        }
    };

    // Function to start the random color animation, cycling through hues
    const startRandomAnimation = () => {
        stopRandomAnimation(); // Ensure no other interval is running
        let hue = Math.floor(Math.random() * 360); // Start at a random hue
        randomColorInterval = setInterval(() => {
            hue = (hue + 1) % 360; // Cycle through hues
            const newColor = `hsl(${hue}, 100%, 50%)`;
            applyColor(newColor);
        }, 50); // Update every 0.1 seconds
    };

    // --- Stylesheet Functions ---
    const setStylesheet = (styleName) => {
        // Disable both first to prevent style clashes
        defaultSheet.disabled = true;
        glassSheet.disabled = true;

        if (styleName === 'glass') {
            glassSheet.disabled = false;
            styleToggle.checked = true;
        } else { // 'default'
            defaultSheet.disabled = false;
            styleToggle.checked = false;
        }
        localStorage.setItem(styleStorageKey, styleName);
    };

    // --- On Page Load ---
    // 1. Set the stylesheet based on saved preference (or default to 'glass')
    const savedStyle = localStorage.getItem(styleStorageKey);
    setStylesheet(savedStyle || 'glass');

    // 2. Set the color based on saved preference
    const savedColor = localStorage.getItem(colorStorageKey);
    if (savedColor) {
        if (savedColor === 'random') {
            startRandomAnimation();
        } else {
            applyColor(savedColor);
        }
    }

    // --- Event Listeners ---
    // Listener for the style toggle switch
    styleToggle.addEventListener('change', () => {
        setStylesheet(styleToggle.checked ? 'glass' : 'default');
    });

    // Listeners for the color buttons
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const colorValue = button.dataset.color;
            stopRandomAnimation(); // Stop any previous animation

            if (colorValue === 'random') {
                startRandomAnimation();
                localStorage.setItem(colorStorageKey, 'random');
            } else {
                const newColor = `var(--${colorValue})`;
                applyColor(newColor);
                localStorage.setItem(colorStorageKey, newColor);
            }
        });
    });
});