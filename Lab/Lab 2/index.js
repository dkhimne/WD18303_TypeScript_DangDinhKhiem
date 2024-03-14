
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

//dem nguoc
const countdownMinutes = 10;
let countdownSeconds = countdownMinutes * 60;
let countdownInterval;

function startCountdown() {
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    countdownSeconds--;
    if (countdownSeconds <= 0) {
        clearInterval(countdownInterval);
        alert("Time's up!");
        return;
    }

    const minutes = Math.floor(countdownSeconds / 60);
    const seconds = countdownSeconds % 60;
    const countdownDisplay = document.getElementById("countdown");
    if (countdownDisplay) {
        countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function resetCountdown() {
    clearInterval(countdownInterval);
    countdownSeconds = countdownMinutes * 60;
    updateCountdown(); // Cập nhật hiển thị đồng hồ đếm ngược
}

const startButton = document.getElementById("start-button");
if (startButton) {
    startButton.addEventListener("click", () => {
        startCountdown();
    });
}

const cancelButton = document.getElementById("cancel-button");
if (cancelButton) {
    cancelButton.addEventListener("click", () => {
        resetCountdown();
    });
}

if (resetButton) {
    resetButton.addEventListener("click", () => {
        resetCountdown();
    });
}
