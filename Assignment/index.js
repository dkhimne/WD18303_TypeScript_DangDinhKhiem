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
let pokemonData = [];
let selectedPokemonIndices = [];
let matchedPokemonIndices = [];
let tempSelectedIndex = null;
let gameStarted = false; // Biến để kiểm tra trò chơi đã bắt đầu chưa
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
        shuffleArray(data);
        for (const [index, pokemon] of data.entries()) {
            html += `
      <div class="col-1 p-1">
        <div class="card shadow position-relative" id="pokemon-${index}" onclick="handlePokemonClick(${index}, '${pokemon.sprites.front_default}')">
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
let firstSelectedImage = null;
function handlePokemonClick(index, imageSrc) {
    // Kiểm tra xem trò chơi đã bắt đầu chưa
    if (!gameStarted) {
        return;
    }
    const selectedPokemon = document.getElementById(`pokemon-${index}`);
    if (!selectedPokemonIndices.includes(index) && !matchedPokemonIndices.includes(index)) {
        selectedPokemonIndices.push(index);
        if (selectedPokemon) {
            const randomColor = getRandomColor();
            selectedPokemon.style.backgroundColor = randomColor;
        }
        if (selectedPokemonIndices.length === 1) {
            tempSelectedIndex = index;
            firstSelectedImage = imageSrc;
        }
        else if (selectedPokemonIndices.length === 2) {
            const [firstIndex, secondIndex] = selectedPokemonIndices;
            if (firstSelectedImage === imageSrc && tempSelectedIndex !== null && tempSelectedIndex !== index) {
                matchedPokemonIndices.push(tempSelectedIndex, index);
                correctPokemonCount += 2;
                const randomColor = getRandomColor();
                const firstPokemon = document.getElementById(`pokemon-${tempSelectedIndex}`);
                const secondPokemon = document.getElementById(`pokemon-${index}`);
                if (firstPokemon && secondPokemon) {
                    firstPokemon.style.backgroundColor = randomColor;
                    secondPokemon.style.backgroundColor = randomColor;
                }
                selectedPokemonIndices = [];
                tempSelectedIndex = null;
                firstSelectedImage = null;
                if (correctPokemonCount === pokemonCount * 2) {
                    alert("Bạn đã hoàn thành trò chơi!");
                    clearInterval(countdownInterval);
                    return;
                }
            }
            else {
                setTimeout(() => {
                    resetColor();
                    selectedPokemonIndices = [];
                    tempSelectedIndex = null;
                    firstSelectedImage = null;
                }, 1000);
            }
        }
    }
    else {
        alert("Chỉ được chọn mỗi ô một lần!");
    }
}
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function resetColor() {
    for (const index of selectedPokemonIndices) {
        const selectedPokemon = document.getElementById(`pokemon-${index}`);
        if (selectedPokemon) {
            selectedPokemon.style.backgroundColor = '';
        }
    }
}
function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        const pokemonUrls = generatePokemonUrls(pokemonCount * 2); // Nhân đôi số lượng Pokemon để đảm bảo đủ cho cả hai bản sao
        pokemonData = yield fetchPokemonData(pokemonUrls);
        let uniqueId = 1;
        for (const pokemon of pokemonData) {
            pokemon.uniqueId = uniqueId++;
        }
        const shuffledPokemonData = [...pokemonData];
        shuffleArray(shuffledPokemonData); // Trộn ngẫu nhiên để chọn 24 con Pokemon từ 48 con
        const selectedPokemonData = shuffledPokemonData.slice(0, pokemonCount); // Chọn 24 con Pokemon từ dữ liệu đã trộn
        const doubledSelectedPokemonData = [...selectedPokemonData, ...selectedPokemonData]; // Nhân đôi để có tổng cộng 48 con Pokemon
        yield displayPokemon(doubledSelectedPokemonData);
        startCountdown();
    });
}
const startButton = document.getElementById("start-button");
if (startButton) {
    startButton.addEventListener("click", () => {
        if (!gameStarted) {
            startGame();
            gameStarted = true;
        }
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
        // Check for win condition
        if (correctPokemonCount === pokemonCount * 2) {
            alert("Bạn đã hoàn thành trò chơi!");
        }
        else {
            alert("Bạn đã thua!");
        }
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
function resetGame() {
    clearInterval(countdownInterval);
    resetCountdown();
    resetColor();
    selectedPokemonIndices = [];
    matchedPokemonIndices = [];
    tempSelectedIndex = null;
    firstSelectedImage = null;
    gameStarted = false;
    if (APP) {
        APP.innerHTML = '';
    }
}
const resetButton = document.getElementById("reset-button");
if (resetButton) {
    resetButton.addEventListener("click", () => {
        const confirmation = confirm("Bạn có chắc chắn muốn bắt đầu lại trò chơi?");
        if (confirmation) {
            resetGame();
        }
    });
}
const cancelButton = document.getElementById("cancel-button");
if (cancelButton) {
    cancelButton.addEventListener("click", () => {
        const confirmation = confirm("Bạn có muốn thoát trò chơi?");
        if (confirmation) {
            window.location.href = "http://127.0.0.1:5500/Assignment/form.html";
        }
    });
}
