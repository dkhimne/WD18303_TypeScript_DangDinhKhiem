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
let pokemonData: any[] = []; 
let selectedPokemonIds: number[] = [];
let matchedPokemonIds: number[] = []; 

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

async function fetchPokemonData(urls: string[]): Promise<any[]> {
  const pokemonData: any[] = [];
  for (const url of urls) {
    pokemonData.push(await pokeApi(url));
  }
  return pokemonData;
}

const APP: HTMLElement | null = document.getElementById("pokemon");
let html: string = '';

async function displayPokemon(data: Pokemon[]): Promise<void> {
  shuffleArray(data);

  for (const pokemon of data) {
    html += `
      <div class="col-1 p-1">
        <div class="card shadow position-relative" id="pokemon-${pokemon.uniqueId}" onclick="handlePokemonClick(${pokemon.uniqueId}, '${pokemon.sprites.front_default}')">
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

function handlePokemonClick(uniqueId: number, imageSrc: string): void {
  const selectedPokemon = document.getElementById(`pokemon-${uniqueId}`);

  if (!selectedPokemonIds.includes(uniqueId) && !matchedPokemonIds.includes(uniqueId)) {
    selectedPokemonIds.push(uniqueId);

    if (selectedPokemon) {
      const randomColor = getRandomColor();
      (selectedPokemon as HTMLElement).style.backgroundColor = randomColor;
    }

    if (selectedPokemonIds.length === 1) {
      firstSelectedImage = imageSrc;
    } else if (selectedPokemonIds.length === 2) {
      const [firstPokemonId, secondPokemonId] = selectedPokemonIds;
      const firstPokemon = document.getElementById(`pokemon-${firstPokemonId}`);
      const secondPokemon = document.getElementById(`pokemon-${secondPokemonId}`);

      if (firstPokemon && secondPokemon) {
        const firstPokemonImgSrc = (firstPokemon.querySelector('img') as HTMLImageElement).src;
        const secondPokemonImgSrc = (secondPokemon.querySelector('img') as HTMLImageElement).src;

        if (firstPokemonImgSrc === secondPokemonImgSrc && firstPokemonId !== secondPokemonId) {
          matchedPokemonIds.push(firstPokemonId, secondPokemonId);
          correctPokemonCount += 2;

          const randomColor = getRandomColor();
          (firstPokemon as HTMLElement).style.backgroundColor = randomColor;
          (secondPokemon as HTMLElement).style.backgroundColor = randomColor;

          selectedPokemonIds = []; 
          firstSelectedImage = null;

          if (correctPokemonCount === pokemonCount * 2) {
            alert("Bạn đã hoàn thành trò chơi!");
            clearInterval(countdownInterval!); 
            return;
          }
        } else {
          setTimeout(() => {
            resetColor();
            selectedPokemonIds = [];
            firstSelectedImage = null;
          }, 1000);
        }
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
  for (const id of selectedPokemonIds) {
    const selectedPokemon = document.getElementById(`pokemon-${id}`);
    if (selectedPokemon) {
      (selectedPokemon as HTMLElement).style.backgroundColor = '';
    }
  }

  if (firstSelectedImage !== null) {
    const selectedPokemons = document.querySelectorAll(`.card img[src='${firstSelectedImage}']`);
    selectedPokemons.forEach(pokemon => {
      const parentCard = pokemon.parentElement;
      if (parentCard) {
        (parentCard as HTMLElement).style.backgroundColor = '';
      }
    });
    firstSelectedImage = null;
  }
}


async function startGame() {
  const pokemonUrls: string[] = generatePokemonUrls(pokemonCount);
  const pokemonData: any[] = await fetchPokemonData(pokemonUrls);

  let uniqueId = 1;
  for (const pokemon of pokemonData) {
    pokemon.uniqueId = uniqueId++;
  }

  const doubledData: any[] = pokemonData.slice();

  await displayPokemon(pokemonData);
  await displayPokemon(doubledData);

  startCountdown();
}


const startButton: HTMLElement | null = document.getElementById("start-button");
if (startButton) {
  startButton.addEventListener("click", () => {
    startGame();
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

const resetButton: HTMLElement | null = document.getElementById("reset-button");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    resetCountdown();
  });
}
