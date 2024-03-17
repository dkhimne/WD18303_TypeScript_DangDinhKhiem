const pokemon: number = 48;

async function pokeApi(url: string): Promise<any> {
    let data: Response = await fetch(url);
    return await data.json();
}

console.log(Math.floor(Math.random() * 48) + 1);

const APP: HTMLElement | null = document.getElementById("pokemon");
let html: string = '';

for (let index = 0; index < 48; index++) {
    const randomPokemonIndex = Math.floor(Math.random() * 48) + 1;

    const data: Promise<any> = pokeApi(`https://pokeapi.co/api/v2/pokemon/${randomPokemonIndex}/`);

    data.then(function(response: any) {
        html += `
        <div class="col-1 p-1">
            <div class="card shadow position-relative">
                <span class="position-absolute top-0">#${response.id}</span>
                <img src="${response.sprites.front_default}" alt="${response.name}">
            </div>
        </div>
        `;
        APP?.innerHTML = html; 
    });
}


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

// click hiện màu
