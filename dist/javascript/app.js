import data from "../data/wordlist.json" assert { type: 'json' };
const guessHistory = document.getElementById('guess-history');
const newWordButton = document.getElementById('new-word');
class App {
    word;
    constructor() {
        /**
         * This method adds an event listener to the submitGuess event. When the event is triggered, the guess is checked against the word and the CSS is updated accordingly.
         */
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
    /**
     * Selects a word from the wordlist
     * @param wordlist - The wordlist to select a word from
     * @returns The selected word
     */
    selectWord(wordlist) {
        return wordlist[Math.floor(Math.random() * wordlist.length)];
    }
    /**
     * This method checks the guess against the word and updates the CSS based on the correct letters.
     * @param guess The word the user guessed
     * @param shadow The shadow root of the guess element
     */
    checkGuess(guess, shadow) {
        guess.split('').forEach((element, index) => {
            element = element.toUpperCase();
            const word = this.word.toUpperCase();
            if (word[index] == element) {
                this.addGuessLetterClass(index, 'correct', shadow);
            }
            else if (word.includes(element)) {
                this.addGuessLetterClass(index, 'close', shadow);
            }
            else {
                this.addGuessLetterClass(index, 'wrong', shadow);
            }
        });
    }
    ;
    /**
     * This method adds a CSS-class to a letter element at a given index
     * @param {number} index - The index of the letter
     * @param {string} _class - The CSS-class to add (correct/ close/ wrong)
     * @param {ShadowRoot} shadow - The shadow-root of the guess element
     */
    addGuessLetterClass(index, _class, shadow) {
        shadow.querySelector(`.guess-letter:nth-child(${index + 1})`)?.classList.add(_class);
    }
    /**
     * This method selects a new word from the wordlist
     * @returns a new word
     */
    newWord() {
        this.word = this.selectWord(data);
        return this.word;
    }
}
/**
 * Alerts the user and reloads the window.
 */
function surrender() {
    alert("Das richtige Wort war " + app.word);
    window.location.reload();
}
const app = new App();
// newWordButton?.addEventListener('click', app.newWord.bind(app));
newWordButton?.addEventListener('click', surrender);
