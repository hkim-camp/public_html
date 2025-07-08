/**
 * Handles changing and persisting the primary theme color using localStorage.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with the .color-btn class
    const colorButtons = document.querySelectorAll('.color-btn');
    // Get the root element (where the CSS variables live)
    const root = document.documentElement;
    const storageKey = 'primaryThemeColor';

    // Function to apply a color to the theme
    const applyColor = (color) => {
        root.style.setProperty('--primary-color', color);
    };

    // On page load, check for a saved color in localStorage
    const savedColor = localStorage.getItem(storageKey);
    if (savedColor) {
        applyColor(savedColor);
    }

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const colorValue = button.dataset.color;
            let newColor;

            if (colorValue === 'random') {
                // Generate a random hue between 0 and 360
                const randomHue = Math.floor(Math.random() * 361);
                newColor = `hsl(${randomHue}, 100%, 50%)`;
            } else {
                // For any other button, use its data-color value
                newColor = colorValue;
            }
            applyColor(newColor);
            localStorage.setItem(storageKey, newColor);
        });
    });
});