

class Guess extends HTMLElement{
    static observedAttributes = ["word"];
    shadow: ShadowRoot;
    word: string;


    /**
     * Returns a string containing CSS styles for the component.
     *
     * @return {string} The CSS styles as a string
     */
    css(): string{
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
        
        
        </style>`
    }
    /**
     * Method to generate an HTML string based on the word attribute.
     *
     * @return {string} the generated HTML string
     */
    html(): string{
        let inner = ""
        console.log(this.word);
        
        this.word.split('').forEach(element => {
            inner += `<div class="guess-letter">${element}</div>`	
            
        });


        return inner
    }

    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.word = this.getAttribute('word') || '';
    }

    /**
     * Render the HTML and CSS content into the shadow DOM.
     */
    render(): void{        
        this.shadow.innerHTML = `
            ${this.html().trim()}
            ${this.css().trim()}
        `;
    }


    /**
     * Updates the component when an attribute has changed.
     *
     * @param {any} name - The name of the attribute that has changed.
     * @param {any} oldValue - The previous value of the attribute.
     * @param {any} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        switch(name){
            case "word":
                this.word = newValue;
                this.render();
        }
    }
}


customElements.define('guess-component', Guess);