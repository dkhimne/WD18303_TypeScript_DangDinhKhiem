"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function validator(constructor, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const inputField = document.getElementById("player-name");
        const errorMessage = document.getElementById("player-name-error");
        if (inputField && inputField.value.trim() !== "") {
            const inputValue = inputField.value.trim();
            const minLength = 4;
            const maxLength = 20;
            const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
            if (inputValue.length >= minLength && inputValue.length <= maxLength && !specialCharactersRegex.test(inputValue)) {
                if (errorMessage) {
                    errorMessage.textContent = "";
                }
                return originalMethod.apply(this, args);
            }
            else {
                let errorText = `Vui lòng nhập tên tài khoản từ ${minLength} đến ${maxLength} ký tự và không chứa kí tự đặc biệt!`;
                if (errorMessage) {
                    errorMessage.textContent = errorText;
                }
                return null;
            }
        }
        else {
            if (errorMessage) {
                errorMessage.textContent = "Vui lòng nhập tên tài khoản!";
            }
            return null;
        }
    };
    return descriptor;
}
class GamePlayer {
    static submitPlayerName(event) {
        event.preventDefault();
        const playerName = GamePlayer.PlayerName();
        if (playerName) {
            localStorage.setItem("playerName", playerName);
            window.location.href = "index.html";
        }
    }
    static PlayerName() {
        const inputField = document.getElementById("player-name");
        if (inputField && inputField.value.trim() !== "") {
            return inputField.value.trim();
        }
        else {
            return null;
        }
    }
}
__decorate([
    validator
], GamePlayer, "submitPlayerName", null);
const playerNameForm = document.getElementById("player-name-form");
if (playerNameForm) {
    playerNameForm.addEventListener("submit", GamePlayer.submitPlayerName);
}
document.addEventListener("DOMContentLoaded", function () {
    const playerName = localStorage.getItem("playerName");
    const player_name = document.getElementById("player-name");
    if (player_name && playerName) {
        player_name.textContent = playerName;
    }
});
const pokemonCount = 24;
let selectedPokemonId = null;
let score = 0;
let correctPokemonCount = 0;
let colorTimeout = null;
let pokemonData = []; // Lưu trữ dữ liệu Pokemon
let selectedPokemonIds = [];
let matchedPokemonIds = []; // Lưu trữ ID của các Pokemon đã được khớp
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
        <div class="card shadow position-relative" id="pokemon-${pokemon.id}" onclick="handlePokemonClick(${pokemon.id})">
          <span class="position-absolute top-0">#${pokemon.id}</span>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
      </div>
    `;
        }
        if (APP)
            APP.innerHTML = html;
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
function handlePokemonClick(pokemonId) {
    const selectedPokemon = document.getElementById(`pokemon-${pokemonId}`);
    if (selectedPokemonIds.length < 2 && !selectedPokemonIds.includes(pokemonId)) {
        selectedPokemonIds.push(pokemonId);
        const randomColor = getRandomColor();
        if (selectedPokemon) {
            selectedPokemon.style.backgroundColor = randomColor;
            colorTimeout = setTimeout(() => resetColor(pokemonId), 1000); // Reset color after 1 second if not a match
        }
        if (selectedPokemonIds.length === 2) {
            const [firstPokemonId, secondPokemonId] = selectedPokemonIds;
            const firstPokemon = document.getElementById(`pokemon-${firstPokemonId}`);
            const secondPokemon = document.getElementById(`pokemon-${secondPokemonId}`);
            if (firstPokemon && secondPokemon) {
                const firstPokemonImgSrc = firstPokemon.querySelector('img').src;
                const secondPokemonImgSrc = secondPokemon.querySelector('img').src;
                if (firstPokemonImgSrc === secondPokemonImgSrc && firstPokemonId !== secondPokemonId) {
                    // Matched
                    matchedPokemonIds.push(firstPokemonId, secondPokemonId);
                    correctPokemonCount += 2;
                    selectedPokemonIds = [];
                    // Apply the same random color to both matched cards
                    firstPokemon.style.backgroundColor = randomColor;
                    secondPokemon.style.backgroundColor = randomColor;
                    clearTimeout(colorTimeout); // Clear timeout if matched
                    if (correctPokemonCount === pokemonCount * 2) {
                        alert("Bạn đã hoàn thành trò chơi!");
                        return;
                    }
                }
                else {
                    // Not a match - reset color after timeout
                }
            }
        }
    }
    else if (selectedPokemonIds.length === 2) {
        // Reset color if clicked more than 2 times
        resetColor();
        selectedPokemonIds = [];
    }
    else {
        alert("Chỉ được chọn mỗi ô một lần!");
    }
}
function resetColor() {
    for (const id of selectedPokemonIds) {
        const selectedPokemon = document.getElementById(`pokemon-${id}`);
        if (selectedPokemon) {
            selectedPokemon.style.backgroundColor = '';
        }
    }
    selectedPokemonIds = [];
}
function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        // Fetch data for the first 24 Pokemon
        const pokemonUrls = generatePokemonUrls(pokemonCount);
        const pokemonData = yield fetchPokemonData(pokemonUrls);
        // Double the data (create a copy)
        const doubledData = pokemonData.slice();
        // Display the shuffled Pokemon
        yield displayPokemon(pokemonData);
        yield displayPokemon(doubledData);
        startCountdown();
    });
}
const startButton = document.getElementById("start-button");
if (startButton) {
    startButton.addEventListener("click", () => {
        startGame();
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
        alert("Hết thời gian!");
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
    countdownSeconds = countdownMinutes * 60 + 1;
    updateCountdown();
}
const resetButton = document.getElementById("reset-button");
if (resetButton) {
    resetButton.addEventListener("click", () => {
        resetCountdown();
    });
}
