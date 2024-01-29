"use strict";
class Guess extends HTMLElement {
    static observedAttributes = ["word"];
    shadow;
    word;
    css() {
        return `<style>

            :host{
                display: flex;
                height: 50px;
            }

            .guess-letter{
                width: 50px;
                height: 50px;
                background-color: white;
                padding: 4px;
            }

            .correct{
                background-color: green;
            }
            .close{
                background-color: yellow;
            }
            .wrong{
                background-color: red;
            }
        
        
        </style>`;
    }
    html() {
        let inner = "";
        console.log(this.word);
        this.word.split('').forEach(element => {
            inner += `<div class="guess-letter">${element}</div>`;
        });
        return inner;
    }
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.word = this.getAttribute('word') || '';
    }
    render() {
        this.shadow.innerHTML = `
            ${this.html().trim()}
            ${this.css().trim()}
        `;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "word":
                this.word = newValue;
                this.render();
        }
    }
}
customElements.define('guess-component', Guess);
