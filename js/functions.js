const input = document.querySelector('input');
const output = document.querySelector('output');
const span = document.getElementById('guess-count');

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
];

let randomizedWord = '';
let maskedWord = '';
let guessCount = 0;

const newGame = () => {
    const random = Math.floor(Math.random() * words.length);
    randomizedWord = words[random];
    maskedWord = "*".repeat(randomizedWord.length);
    console.log(randomizedWord);
    output.innerHTML = maskedWord;
    guessCount = 0;
    updateGuessCount();
};

const updateGuessCount = () => {
    span.textContent = guessCount;
};

const win = () => {
    alert(`You have guessed right, the word is ${randomizedWord}. It took you ${guessCount} guesses.`);
    newGame();
};

const replaceFoundChars = (guess) => {
    let newString = maskedWord.split('');
    let found = false;
    for (let i = 0; i < randomizedWord.length; i++) {
        const char = randomizedWord.substring(i, i + 1);
        if (char === guess) {
            newString.splice(i, 1, guess);
            found = true;
        }
    }
    if (found) {
        maskedWord = newString.join('');
        output.innerHTML = maskedWord;
    }
};

newGame();

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }

    const guess = input.value.toLowerCase();
    guessCount++;
    updateGuessCount();
    if (guess === randomizedWord.toLowerCase()) {
        win();
    } else if (guess.length === 1) {
        replaceFoundChars(guess);
        if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
            win();
        }
    } else {
        alert("You guessed wrong!");
    }
    input.value = '';
});
