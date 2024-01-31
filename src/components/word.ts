

class Word extends HTMLElement{
    shadow: ShadowRoot;
    inputFields: NodeListOf<HTMLInputElement>;
    currentLetter: number = 0;


    /**
     * A function that generates a CSS style block.
     *
     * @return {string} the CSS style block as a string
     */
    css(){
        return `<style>
            input{
                width: 50px;
                height: 50px;
            }
        
        
        </style>`
    }
    /**
     * Generates a string of HTML input elements.
     *
     * @return {string} The string of HTML input elements.
     */
    html(){
        let inner = ""
        for (let i = 0; i < 5; i++){
            inner += `<input type="text" maxlength="1"></input>`
        }
        return inner
    }

    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        this.render();
        
        this.inputFields = this.shadow.querySelectorAll('input');
        this.inputFields.forEach((input, index) => {
            input.addEventListener('input', (event) => this.focusOnNextField(input, index))
                input.addEventListener('keydown', (event) => {
                    switch (event.key){
                        case 'Enter':
                            event.preventDefault();
                            this.submitGuess()
                            break;
                        case 'Backspace':
                        case 'Delete':
                            this.removeLetter(event, input, index)
                            break;
                        case 'ArrowLeft':
                            this.focusField(index - 1);

                            break;
                        case 'ArrowRight':
                            this.focusField(index + 1);
                            break;

                    }
                })
        })
    }

    /**
     * Render the content by setting innerHTML with the HTML and CSS content.
     */
    render(){        
        this.shadow.innerHTML = `
            ${this.html().trim()}
            ${this.css().trim()}
        `;
    }

    /**
     * A function to handle the removal of a letter when the 'Backspace' key is pressed.
     *
     * @param {KeyboardEvent} event - the keyboard event triggering the function
     * @param {HTMLInputElement} input - the HTML input element where the event occurred
     * @param {number} index - the index of the input element
     */
    removeLetter(event: KeyboardEvent, input:HTMLInputElement, index: number){
        if(event.key === 'Backspace' && index > 0){
            // focus on previous word field
            let currentValue = input.value;
            if(currentValue === ''){
                this.focusField(index - 1);

            }
        }
    }

    /**
     * Focuses on the next field based on the input and index.
     *
     * @param {HTMLInputElement} input - the input element to be focused on
     * @param {number} index - the current index of the input element
     */
    focusOnNextField(input: HTMLInputElement, index: number) {
        input.value = input.value.toUpperCase();
        if (input.value.length >= 1 && index < 4) {
            // focus on next word field
            this.focusField(index + 1);
        }
    }
    
    /**
     * Sets the focus on the input field at the specified index.
     *
     * @param {number} index - the index of the input field to focus on
     * @return {void} 
     */
    focusField(index: number): void{
        this.currentLetter = index;
        this.inputFields[this.currentLetter].focus();
    }

    /**
     * Submit the user's guess by retrieving values from input fields and dispatching an event.
     */
    submitGuess(){
        let _guess: string = "";

        this.inputFields.forEach((input) => {
            if(input.value === '' || input.value == ' '){
                return;
            }
            _guess += input.value;
        });     
        if(_guess.length < 5){
            return;
        }
        this.inputFields.forEach((input) => {
            input.value = '';
        })

        submitGuess.detail.guess = _guess;
        dispatchEvent(submitGuess)
        this.focusField(0);

    }
}


const submitGuess = new CustomEvent('submitGuess', {
    detail: {
        guess: ''
    }});

customElements.define('word-component', Word);