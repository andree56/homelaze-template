// utils/colorHelper.js
function getRandomColor() {
    const colors = ['#faa732', '#56ab2f', '#3498db', '#8854d0', '#ed3330'];
    return colors[Math.floor(Math.random() * colors.length)];
}

module.exports = getRandomColor;
