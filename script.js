const bgColorPicker = document.getElementById('bg-color-picker');
const scrollColorPicker = document.getElementById('scroll-color-picker');
const colorPickerLabels = document.querySelectorAll('.color-picker-label');
const headings = document.querySelectorAll('.content h1, .content h2, .content h3, .content h4, .content h5, .content h6');
const paragraphs = document.querySelectorAll('.content p');

bgColorPicker.addEventListener('input', (event) => {
    const bgColor = event.target.value;
    document.body.style.backgroundColor = bgColor;

    // Adjust text color based on background brightness
    const brightness = getBrightness(bgColor);
    for (let label of colorPickerLabels) {
        label.style.color = brightness > 128 ? 'black' : 'white';
    }
    for (let heading of headings) {
        heading.style.color = brightness > 128 ? 'black' : 'white';
    }
    for (let p of paragraphs) {
        p.style.color = brightness > 128 ? 'black' : 'white';
    }
});

scrollColorPicker.addEventListener('input', (event) => {
    const scrollColor = event.target.value;
    document.documentElement.style.setProperty('--scroll-thumb-color', scrollColor);
});

document.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollFraction = scrollTop / scrollHeight;

    const startColor = hexToRgb(scrollColorPicker.value);
    const endColor = [255, 235, 59]; // RGB for #ffeb3b

    const currentColor = startColor.map((start, i) => {
        return Math.round(start + (endColor[i] - start) * scrollFraction);
    });

    const currentColorString = `rgb(${currentColor.join(',')})`;

    document.documentElement.style.setProperty('--scroll-thumb-color', currentColorString);
});

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function getBrightness(hex) {
    const [r, g, b] = hexToRgb(hex);
    // Calculate brightness using the formula for luminance perception
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// Initial adjustment based on default background color
const initialBgColor = bgColorPicker.value;
document.body.style.backgroundColor = initialBgColor;
const initialBrightness = getBrightness(initialBgColor);
for (let label of colorPickerLabels) {
    label.style.color = initialBrightness > 128 ? 'black' : 'white';
}
for (let heading of headings) {
    heading.style.color = initialBrightness > 128 ? 'black' : 'white';
}
for (let p of paragraphs) {
    p.style.color = initialBrightness > 128 ? 'black' : 'white';
}
