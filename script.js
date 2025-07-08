/**
 * Handles changing the primary theme color.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with the .color-btn class
    const colorButtons = document.querySelectorAll('.color-btn');
    // Get the root element (where the CSS variables live)
    const root = document.documentElement;

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const colorValue = button.dataset.color;

            if (colorValue === 'random') {
                // Generate a random hue between 0 and 360
                const randomHue = Math.floor(Math.random() * 361);
                const newColor = `hsl(${randomHue}, 100%, 50%)`;
                root.style.setProperty('--primary-color', newColor);
            } else {
                // For any other button, use its data-color value
                root.style.setProperty('--primary-color', colorValue);
            }
        });
    });
});