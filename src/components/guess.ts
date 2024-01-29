

class Guess extends HTMLElement{
    static observedAttributes = ["word"];
    shadow: ShadowRoot;
    word: string;


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

    render(): void{        
        this.shadow.innerHTML = `
            ${this.html().trim()}
            ${this.css().trim()}
        `;
    }


    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        switch(name){
            case "word":
                this.word = newValue;
                this.render();
        }
    }
}


customElements.define('guess-component', Guess);