const settingsForm = document.getElementById('settings-form');

const endGameElement = document.getElementById('end-game-container');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

const settingsButton = document.getElementById('settings-btn');

const difficultySelect = document.getElementById('difficulty');
const settings = document.getElementById('settings');
const word = document.getElementById('word');
const text = document.getElementById('text');

const WORDS = ['airplane', 'doctor', 'imcomplete (sic)', 'superficial', 'zany'];
const timeInterval = setInterval(updateTime, 1000);

text.focus();

let randomWord;
let score = 0;
let time = 10;

let difficulty = 
    localStorage.getItem('difficulty') !== null ? 
    localStorage.getItem('difficulty') : 'medium';
difficultySelect.value = 
    localStorage.getItem('difficulty') !== null ? 
    localStorage.getItem('difficulty') : 'medium';

function getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function updateScore() {
    score++;
    scoreElement.innerHTML = score;
}

function updateTime() {
    time--;
    timeElement.innerHTML = time + ' seconds';

    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endGameElement.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}.</p>
        <button onclick="location.reload()">Reload</button>
    `;
    endGameElement.style.display = 'flex';
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 1;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});

settingsButton.addEventListener('click', () => {
    settings.classList.toggle('hide');
})

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});

addWordToDOM();