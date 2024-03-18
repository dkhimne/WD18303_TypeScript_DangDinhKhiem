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
const pokemonCount = 24;
function pokeApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(url);
        return yield response.json();
    });
}
function generatePokemonUrls(count) {
    const urls = [];
    for (let i = 1; i <= count; i++) {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    return urls;
}
function fetchPokemonData(urls) {
    return __awaiter(this, void 0, void 0, function* () {
        const pokemonData = [];
        for (const url of urls) {
            pokemonData.push(yield pokeApi(url));
        }
        return pokemonData;
    });
}
const APP = document.getElementById("pokemon");
let html = '';
function displayPokemon(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Shuffle the data array to randomize Pokemon positions
        shuffleArray(data);
        for (const pokemon of data) {
            html += `
      <div class="col-1 p-1">
        <div class="card shadow position-relative">
          <span class="position-absolute top-0">#${pokemon.id}</span>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
      </div>
    `;
        }
        APP === null || APP === void 0 ? void 0 : APP.innerHTML = html;
    });
}
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    // While there are elements remaining to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch data for the first 24 Pokemon
    const pokemonUrls = generatePokemonUrls(pokemonCount);
    const pokemonData = yield fetchPokemonData(pokemonUrls);
    // Double the data (create a copy)
    const doubledData = pokemonData.slice();
    // Display the shuffled Pokemon
    yield displayPokemon(pokemonData);
    yield displayPokemon(doubledData);
}))();
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
