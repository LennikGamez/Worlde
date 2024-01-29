import data from '../data/wordlist.json' assert { type: 'json' };
const guessHistory: HTMLElement | null = document.getElementById('guess-history'); 


class App{
    word: string;
    constructor(){
        addEventListener('submitGuess', (event: any) => {
            const guess: string = event.detail.guess;
            const guessElement: any = document.createElement('guess-component');
            guessElement.setAttribute('word', guess);

            this.checkGuess(guess, guessElement.shadowRoot);

            guessHistory?.appendChild(guessElement);    
        }) 

        this.word = this.newWord();
        console.log(this.word);
        
        
    }
    
    selectWord(wordlist: Array<string>): string {
        return wordlist[Math.floor(Math.random() * wordlist.length)];
    }

    checkGuess(guess: string, shadow: ShadowRoot): void{
        this.word.split('').forEach((element: string, index: number) => {
            element = element.toUpperCase();

            if(guess[index] == element){
                this.addGuessLetterClass(index, 'correct', shadow);
            }
            else if(guess.includes(element)){
                this.addGuessLetterClass(index, 'close', shadow);
            }
            else{
                this.addGuessLetterClass(index, 'wrong', shadow);
            }
        }) 
    };

    addGuessLetterClass(index:number, _class: string, shadow: ShadowRoot): void {
        shadow.querySelector(`.guess-letter:nth-child(${index + 1})`)?.classList.add(_class);
    }

    newWord(){
        this.word = this.selectWord(data);
        return this.word
    }

}

const app = new App();
