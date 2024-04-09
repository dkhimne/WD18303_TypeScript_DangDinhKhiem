function validator(constructor: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]): any {
    const inputField: HTMLInputElement | null = document.getElementById("player-name") as HTMLInputElement;

    const errorMessage: HTMLElement | null = document.getElementById("player-name-error");

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
      } else {
        let errorText = `Vui lòng nhập tên tài khoản từ ${minLength} đến ${maxLength} ký tự và không chứa kí tự đặc biệt!`;
        if (errorMessage) {
          errorMessage.textContent = errorText;
        }
        return null;
      }
    } else {
      if (errorMessage) {
        errorMessage.textContent = "Vui lòng nhập tên tài khoản!";
      }
      return null;
    }
  };

  return descriptor;
}


class GamePlayer {
  @validator
  static submitPlayerName(event: Event): void {
    event.preventDefault(); 

    const playerName: string | null = GamePlayer.PlayerName();

    if (playerName) {
      localStorage.setItem("playerName", playerName);
      window.location.href = "index.html";
    }
  }

  static PlayerName(): string | null {
    const inputField: HTMLInputElement | null = document.getElementById("player-name") as HTMLInputElement;

    if (inputField && inputField.value.trim() !== "") {
      return inputField.value.trim();
    } else {
      return null;
    }
  }
}

const playerNameForm: HTMLFormElement | null = document.getElementById("player-name-form") as HTMLFormElement;

if (playerNameForm) {
  playerNameForm.addEventListener("submit", GamePlayer.submitPlayerName);
}

document.addEventListener("DOMContentLoaded", function () {

  const playerName: string | null = localStorage.getItem("playerName");

  const player_name: HTMLElement | null = document.getElementById("player-name");

  if (player_name && playerName) {
    player_name.textContent = playerName ;
  }
});



interface Pokemon {
  id: number;
  uniqueId: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

const pokemonCount: number = 24;
let selectedPokemonId: number | null = null;
let score: number = 0;
let correctPokemonCount: number = 0;
let colorTimeout: NodeJS.Timeout | null = null;
let pokemonData: Pokemon[] = [];
let selectedPokemonIndices: number[] = [];
let matchedPokemonIndices: number[] = [];
let tempSelectedIndex: number | null = null;
let gameStarted: boolean = false; // Biến để kiểm tra trò chơi đã bắt đầu chưa

async function pokeApi(url: string): Promise<any> {
  let response = await fetch(url);
  return await response.json();
}

function generatePokemonUrls(count: number): string[] {
  const urls: string[] = [];
  for (let i = 1; i <= count; i++) {
    urls.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  }
  return urls;
}

async function fetchPokemonData(urls: string[]): Promise<Pokemon[]> {
  const pokemonData: Pokemon[] = [];
  for (const url of urls) {
    pokemonData.push(await pokeApi(url));
  }
  return pokemonData;
}

const APP: HTMLElement | null = document.getElementById("pokemon");
let html: string = '';

async function displayPokemon(data: Pokemon[]): Promise<void> {
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
  if (APP) APP.innerHTML = html;
}

function shuffleArray<T>(array: T[]): void {
  let currentIndex: number = array.length, randomIndex: number;

  // While there are elements remaining to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

let firstSelectedImage: string | null = null;

function handlePokemonClick(index: number, imageSrc: string): void {
  // Kiểm tra xem trò chơi đã bắt đầu chưa
  if (!gameStarted) {
    return;
  }

  const selectedPokemon = document.getElementById(`pokemon-${index}`);

  if (!selectedPokemonIndices.includes(index) && !matchedPokemonIndices.includes(index)) {
    selectedPokemonIndices.push(index);

    if (selectedPokemon) {
      const randomColor = getRandomColor();
      (selectedPokemon as HTMLElement).style.backgroundColor = randomColor;
    }

    if (selectedPokemonIndices.length === 1) {
      tempSelectedIndex = index;
      firstSelectedImage = imageSrc;
    } else if (selectedPokemonIndices.length === 2) {
      const [firstIndex, secondIndex] = selectedPokemonIndices;

      if (firstSelectedImage === imageSrc && tempSelectedIndex !== null && tempSelectedIndex !== index) {
        matchedPokemonIndices.push(tempSelectedIndex, index);
        correctPokemonCount += 2;

        const randomColor = getRandomColor();
        const firstPokemon = document.getElementById(`pokemon-${tempSelectedIndex}`);
        const secondPokemon = document.getElementById(`pokemon-${index}`);

        if (firstPokemon && secondPokemon) {
          (firstPokemon as HTMLElement).style.backgroundColor = randomColor;
          (secondPokemon as HTMLElement).style.backgroundColor = randomColor;
        }

        selectedPokemonIndices = [];
        tempSelectedIndex = null;
        firstSelectedImage = null;

        if (correctPokemonCount === pokemonCount * 2) {
          alert("Bạn đã hoàn thành trò chơi!");
          clearInterval(countdownInterval!);
          return;
        }
      } else {
        setTimeout(() => {
          resetColor();
          selectedPokemonIndices = [];
          tempSelectedIndex = null;
          firstSelectedImage = null;
        }, 1000);
      }
    }
  } else {
    alert("Chỉ được chọn mỗi ô một lần!");
  }
}

function getRandomColor(): string {
  const letters: string = "0123456789ABCDEF";
  let color: string = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function resetColor(): void {
  for (const index of selectedPokemonIndices) {
    const selectedPokemon = document.getElementById(`pokemon-${index}`);
    if (selectedPokemon) {
      (selectedPokemon as HTMLElement).style.backgroundColor = '';
    }
  }
}

async function startGame(): Promise<void> {
  const pokemonUrls: string[] = generatePokemonUrls(pokemonCount * 2); // Nhân đôi số lượng Pokemon để đảm bảo đủ cho cả hai bản sao
  pokemonData = await fetchPokemonData(pokemonUrls);

  let uniqueId = 1;
  for (const pokemon of pokemonData) {
    pokemon.uniqueId = uniqueId++;
  }

  const shuffledPokemonData: Pokemon[] = [...pokemonData];
  shuffleArray(shuffledPokemonData); // Trộn ngẫu nhiên để chọn 24 con Pokemon từ 48 con

  const selectedPokemonData: Pokemon[] = shuffledPokemonData.slice(0, pokemonCount); // Chọn 24 con Pokemon từ dữ liệu đã trộn
  const doubledSelectedPokemonData: Pokemon[] = [...selectedPokemonData, ...selectedPokemonData]; // Nhân đôi để có tổng cộng 48 con Pokemon

  await displayPokemon(doubledSelectedPokemonData);

  startCountdown();
}


const startButton: HTMLElement | null = document.getElementById("start-button");
if (startButton) {
  startButton.addEventListener("click", () => {
    if (!gameStarted) {
      startGame();
      gameStarted = true;
    }
  });
}
const countdownMinutes: number = 10;
let countdownSeconds: number = countdownMinutes * 60;
let countdownInterval: NodeJS.Timeout | null = null;

function startCountdown(): void {
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown(): void {
  countdownSeconds--;
  if (countdownSeconds <= 0) {
    clearInterval(countdownInterval!);
    alert("Hết thời gian!");
    // Check for win condition
    if (correctPokemonCount === pokemonCount * 2) {
      alert("Bạn đã hoàn thành trò chơi!");
    } else {
      alert("Bạn đã thua!");
    }
    return;
  }

  const minutes: number = Math.floor(countdownSeconds / 60);
  const seconds: number = countdownSeconds % 60;
  const countdownDisplay: HTMLElement | null = document.getElementById("countdown");
  if (countdownDisplay) {
    countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

function resetCountdown(): void {
  clearInterval(countdownInterval!);
  countdownSeconds = countdownMinutes * 60 + 1;
  updateCountdown();
}



function resetGame(): void {
  clearInterval(countdownInterval!);
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

const resetButton: HTMLElement | null = document.getElementById("reset-button");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    const confirmation = confirm("Bạn có chắc chắn muốn bắt đầu lại trò chơi?");
    if (confirmation) {
      resetGame();
    }
  });
}

const cancelButton: HTMLElement | null = document.getElementById("cancel-button");
if (cancelButton) {
  cancelButton.addEventListener("click", () => {
    const confirmation = confirm("Bạn có muốn thoát trò chơi?");
    if (confirmation) {
      window.location.href = "http://127.0.0.1:5500/Assignment/form.html"; 
    }
  });
}


