"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pokemon = 48;
function pokeApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetch(url);
        return yield data.json();
    });
}
console.log(Math.floor(Math.random() * 48) + 1);
const APP = document.getElementById("pokemon");
let html = '';
for (let index = 0; index < 48; index++) {
    const randomPokemonIndex = Math.floor(Math.random() * 48) + 1;
    const data = pokeApi(`https://pokeapi.co/api/v2/pokemon/${randomPokemonIndex}/`);
    data.then(function (response) {
        html += `
        <div class="col-1 p-1">
            <div class="card shadow position-relative">
                <span class="position-absolute top-0">#${response.id}</span>
                <img src="${response.sprites.front_default}" alt="${response.name}">
            </div>
        </div>
        `;
        APP === null || APP === void 0 ? void 0 : APP.innerHTML = html; // Di chuyển việc cập nhật HTML vào trong promise để đảm bảo dữ liệu đã được nhận trước khi cập nhật nội dung
    });
}
const countdownMinutes = 10;
let countdownSeconds = countdownMinutes * 60;
let countdownInterval = null;
function startCountdown() {
    countdownInterval = setInterval(updateCountdown, 1000);
}
function updateCountdown() {
    countdownSeconds--;
    if (countdownSeconds <= 0) {
        clearInterval(countdownInterval);
        alert("Het thoi gian!");
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
    countdownSeconds = countdownMinutes * 60 + 1; // Thiết lập lại thời gian về 10 phút
    updateCountdown(); // Cập nhật hiển thị đồng hồ đếm ngược
}
const startButton = document.getElementById("start-button");
if (startButton) {
    startButton.addEventListener("click", () => {
        startCountdown();
    });
}
const resetButton = document.getElementById("reset-button");
if (resetButton) {
    resetButton.addEventListener("click", () => {
        resetCountdown();
    });
}
// click hiện màu
