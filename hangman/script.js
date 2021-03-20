const wordElement = document.getElementById('word');
const incorrectLettersElement = document.getElementById('incorrect-letters');

const popupContainer = document.getElementById('popup-container');
const notificationContainer = document.getElementById('notification-container');

const playButton = document.getElementById('play-button');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const WORDS = [
  'thankless', 
  'dire', 
  'downtrodden', 
  'sly', 
  'terse', 
  'bawdy', 
  'sullen', 
  'hellow (sic)'
];
let selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)];

const correctLetters = [];
const incorrectLetters = [];

/* Display the (hidden) word to guess. */
function displayWord() {
  wordElement.innerHTML = `
  ${selectedWord.split('').map(letter => `
    <span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>
    `).join('')
  }`;

  // Replace the newline character with an empty string.
  const innerWord = wordElement.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congratulations! You won!`;
    popupContainer.style.display = 'flex';
  }
}

function updateIncorrectLettersElement() {
  incorrectLettersElement.innerHTML = `
    ${incorrectLetters.length > 0 ? '<p>Incorrect:</p>' : ''}
    ${incorrectLetters.map(letter => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = incorrectLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (incorrectLetters.length === figureParts.length) {
    finalMessage.innerText = "You Lose. This is unfortunate and embarrassing.";
    popupContainer.style.display = 'flex';
  }
}

function displayIncorrectNotification() {
  notificationContainer.classList.add('show');
  setTimeout(() => {
    notificationContainer.classList.add('remove');
  }, 2000);
}

function _handleCorrectLetter(letter) {
  if (!correctLetters.includes(letter)) {
    correctLetters.push(letter);
    displayWord();
  } else {
    displayIncorrectNotification();
  }
}

function _handleIncorrectLetter(letter) {
  if (!incorrectLetters.includes(letter)) {
    incorrectLetters.push(letter);
    updateIncorrectLettersElement();
  } else {
    displayIncorrectNotification();
  }
}

/* Keydown letter press */
window.addEventListener('keydown', e => {
  // a - z. e.g.: 65 - 90.
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      _handleCorrectLetter(letter);
    } else {
      _handleIncorrectLetter(letter);
    }
  }
});

playButton.addEventListener('click', () => {
  correctLetters.splice(0);
  incorrectLetters.splice(0);

  selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  displayWord();
  updateIncorrectLettersElement();
  popupContainer.style.display = 'none';
})

displayWord();