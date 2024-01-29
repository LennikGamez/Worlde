"use strict";
class Word extends HTMLElement {
    shadow;
    inputFields;
    currentLetter = 0;
    css() {
        return `<style>
            input{
                width: 50px;
                height: 50px;
            }
        
        
        </style>`;
    }
    html() {
        let inner = "";
        for (let i = 0; i < 5; i++) {
            inner += `<input type="text" maxlength="1"></input>`;
        }
        return inner;
    }
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
        this.inputFields = this.shadow.querySelectorAll('input');
        this.inputFields.forEach((input, index) => {
            input.addEventListener('input', (event) => this.focusOnNextField(input, index));
            input.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case 'Enter':
                        event.preventDefault();
                        this.submitGuess();
                        break;
                    case 'Backspace':
                    case 'Delete':
                        this.removeLetter(event, input, index);
                        break;
                    case 'ArrowLeft':
                        this.focusField(index - 1);
                        break;
                    case 'ArrowRight':
                        this.focusField(index + 1);
                        break;
                }
            });
        });
    }
    render() {
        this.shadow.innerHTML = `
            ${this.html().trim()}
            ${this.css().trim()}
        `;
    }
    removeLetter(event, input, index) {
        if (event.key === 'Backspace' && index > 0) {
            // focus on previous word field
            let currentValue = input.value;
            if (currentValue === '') {
                this.focusField(index - 1);
            }
        }
    }
    focusOnNextField(input, index) {
        input.value = input.value.toUpperCase();
        if (input.value.length >= 1 && index < 4) {
            // focus on next word field
            this.focusField(index + 1);
        }
    }
    focusField(index) {
        this.currentLetter = index;
        this.inputFields[this.currentLetter].focus();
    }
    submitGuess() {
        let _guess = "";
        this.inputFields.forEach((input) => {
            if (input.value === '' || input.value == ' ') {
                return;
            }
            _guess += input.value;
        });
        if (_guess.length < 5) {
            return;
        }
        this.inputFields.forEach((input) => {
            input.value = '';
        });
        submitGuess.detail.guess = _guess;
        dispatchEvent(submitGuess);
        this.focusField(0);
    }
}
const submitGuess = new CustomEvent('submitGuess', {
    detail: {
        guess: ''
    }
});
customElements.define('word-component', Word);
