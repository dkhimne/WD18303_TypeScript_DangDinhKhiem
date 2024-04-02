//bat loi va save ten khi nhap thanh cong
function validateForm(): boolean {
  const playerNameInput = document.getElementById('player-name') as HTMLInputElement;
  const playerName = playerNameInput.value.trim();
  const playerNameError = document.getElementById('player-name-error');
  
  if (playerName === '') {
      playerNameError.innerText = 'Vui lòng nhập tên của bạn';
      return false;
  }

  const minLength = 5;
  const maxLength = 20;

  if (playerName.length < minLength) {
      playerNameError.textContent = `Tên phải có ít nhất ${minLength} kí tự`;
      return false;
  }

  if (playerName.length > maxLength) {
      playerNameError.textContent = `Giới hạn đặt tên chỉ ${maxLength} kí tự`;
      return false;
  }

  const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialCharactersRegex.test(playerName)) {
      playerNameError.textContent = 'Tên không được chứa kí tự đặc biệt';
      return false;
  }
  // Lưu tên người chơi vào sessionStorage
  sessionStorage.setItem('playerName', playerName);

  return true;
}
window.onload = function () {
  const playerName = sessionStorage.getItem('playerName');
  if (playerName) {
      const playerNameElement = document.getElementById('player-name');
      playerNameElement.innerText = playerName;
  }
};




const pokemonCount = 24;

async function pokeApi(url: string): Promise<any> {
  let response = await fetch(url);
  return await response.json();
}

function generatePokemonUrls(count: number): string[] {
  const urls = [];
  for (let i = 1; i <= count; i++) {
    urls.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  }
  return urls;
}

async function fetchPokemonData(urls: string[]): Promise<any[]> {
  const pokemonData = [];
  for (const url of urls) {
    pokemonData.push(await pokeApi(url));
  }
  return pokemonData;
}

const APP: HTMLElement | null = document.getElementById("pokemon");
let html = '';

async function displayPokemon(data: any[]) {
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
  APP?.innerHTML = html;
}

function shuffleArray(array: any[]) {
  let currentIndex = array.length, randomIndex;

  // While there are elements remaining to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

(async () => {
  // Fetch data for the first 24 Pokemon
  const pokemonUrls = generatePokemonUrls(pokemonCount);
  const pokemonData = await fetchPokemonData(pokemonUrls);

  // Double the data (create a copy)
  const doubledData = pokemonData.slice();

  // Display the shuffled Pokemon
  await displayPokemon(pokemonData);
  await displayPokemon(doubledData);
})();



const countdownMinutes: number = 10;
let countdownSeconds: number = countdownMinutes * 60;
let countdownInterval: NodeJS.Timeout | null = null;

function startCountdown() {
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    countdownSeconds--;
    if (countdownSeconds <= 0) {
        clearInterval(countdownInterval!);
        alert("Het thoi gian!");
        return;
    }

    const minutes = Math.floor(countdownSeconds / 60);
    const seconds = countdownSeconds % 60;
    const countdownDisplay: HTMLElement | null = document.getElementById("countdown");
    if (countdownDisplay) {
        countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function resetCountdown() {
    clearInterval(countdownInterval!);
    countdownSeconds = countdownMinutes * 60 + 1 ; // Thiết lập lại thời gian về 10 phút
    updateCountdown(); // Cập nhật hiển thị đồng hồ đếm ngược
}

const startButton: HTMLElement | null = document.getElementById("start-button");
if (startButton) {
    startButton.addEventListener("click", () => {
        startCountdown();
    });
}


const resetButton: HTMLElement | null = document.getElementById("reset-button");
if (resetButton) {
    resetButton.addEventListener("click", () => {
        resetCountdown();
    });
}



