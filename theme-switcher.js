/**
 * Handles changing and persisting the primary theme color using localStorage.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with the .color-btn class
    const colorButtons = document.querySelectorAll('.color-btn');
    // Get the root element (where the CSS variables live)
    const root = document.documentElement;
    const storageKey = 'primaryThemeColor';
    let randomColorInterval = null; // To hold the interval ID

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

    // On page load, check for a saved color in localStorage
    const savedColor = localStorage.getItem(storageKey);
    if (savedColor) {
        if (savedColor === 'random') {
            startRandomAnimation();
        } else {
            applyColor(savedColor);
        }
    }

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const colorValue = button.dataset.color;
            stopRandomAnimation(); // Stop any previous animation

            if (colorValue === 'random') {
                startRandomAnimation();
                localStorage.setItem(storageKey, 'random');
            } else {
                const newColor = `var(--${colorValue})`;
                applyColor(newColor);
                localStorage.setItem(storageKey, newColor);
            }
        });
    });
});