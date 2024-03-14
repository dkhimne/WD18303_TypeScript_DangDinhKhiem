//bai 2
// console.log("Hello");
//bai 3
// var a = 5;
// var b = 6;
// console.log(a + b);

const imageCards = document.querySelectorAll('.card');

imageCards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove previously set custom color (if any)
    card.style.removeProperty('background-color');

    const h = Math.floor(Math.random() * 360); 
    const s = 100; // Saturation (0-100%)
    const l = 50; // Lightness (0-100%)
    const randomColor = `hsl(${h}, ${s}%, ${l}%)`;

    card.style.backgroundColor = randomColor;
  });
});

const resetButton = document.getElementById('reset-button');
if (resetButton) {
  resetButton.addEventListener('click', () => {
    imageCards.forEach(card => {
      card.style.backgroundColor = null; 
    });
  });
}