import data from "../data/wordlist.json" assert { type: 'json' };
const guessHistory = document.getElementById('guess-history');
const newWordButton = document.getElementById('new-word');
class App {
    word;
    constructor() {
        addEventListener('submitGuess', (event) => {
            const guess = event.detail.guess;
            const guessElement = document.createElement('guess-component');
            guessElement.setAttribute('word', guess);
            this.checkGuess(guess, guessElement.shadowRoot);
            guessHistory?.appendChild(guessElement);
        });
        this.word = this.newWord();
        console.log(this.word);
    }
    selectWord(wordlist) {
        return wordlist[Math.floor(Math.random() * wordlist.length)];
    }
    checkGuess(guess, shadow) {
        this.word.split('').forEach((element, index) => {
            element = element.toUpperCase();
            if (guess[index] == element) {
                this.addGuessLetterClass(index, 'correct', shadow);
            }
            else if (guess.includes(element)) {
                this.addGuessLetterClass(index, 'close', shadow);
            }
            else {
                this.addGuessLetterClass(index, 'wrong', shadow);
            }
        });
    }
    ;
    addGuessLetterClass(index, _class, shadow) {
        shadow.querySelector(`.guess-letter:nth-child(${index + 1})`)?.classList.add(_class);
    }
    newWord() {
        this.word = this.selectWord(data);
        return this.word;
    }
}
function surrender() {
    alert("Das richtige Wort war " + app.word);
    window.location.reload();
}
const app = new App();
// newWordButton?.addEventListener('click', app.newWord.bind(app));
newWordButton?.addEventListener('click', surrender);
