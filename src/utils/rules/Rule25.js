import { GenericRule } from '../GenericRule';
import { generateHighlightString } from '../functions';

export class Rule25 extends GenericRule {
    static instance = new Rule25();
    static sacrificedLetters = [];

    constructor() {
        super();
        this.number = 25;
        this.desc = 'A sacrifice must be made. Pick 2 letters that you will no longer be able to use.';
        this.selectedLetters = [];
    }

    getClass() {
        return Rule25;
    }

    checkRule() {
        this.getClass().fulfilled = this.getClass().sacrificedLetters.length > 0 && this.getClass().sacrificedLetters.every((letter) => !this.textController.clearText.includes(letter));
    }

    getHighlightString() {
        const highlight = this.getClass().sacrificedLetters.length > 0 ? new RegExp(this.getClass().sacrificedLetters.join("|"), "g") : /^$/;

        return generateHighlightString(this.textController.getHtml(), highlight);
    }

    handleClick = (index) => {
        const selectedIndex = this.selectedLetters.indexOf(index);

        if (selectedIndex !== -1) {
            this.selectedLetters.splice(selectedIndex, 1);
        } else {
            if (this.selectedLetters.length === 2) {
                this.selectedLetters.splice(selectedIndex, 1);
            }

            this.selectedLetters.push(index);
        }

        this.forceUpdate();
    }

    handleSacrifice() {
        this.getClass().sacrificedLetters = this.selectedLetters.map((letterNum) => String.fromCharCode(97 + letterNum));

        this.forceUpdate();
        this.textController.updateText(this.textController.rawText);
    }

    render() {
        const sacrificed = this.getClass().sacrificedLetters;
        const sacrificeMade = sacrificed.length > 0;

        return (
            <div className={`sacrifice-area ${sacrificeMade ? 'sacrifice-made' : ''}`}>
                <div className='letters'>
                    {[...Array(26)].map((_, index) => (
                        <button
                            className={`letter ${this.selectedLetters.includes(index) ? 'letter-selected' : ''}`}
                            key={index}
                            onClick={() => this.handleClick(index)}
                            disabled={sacrificeMade}
                        >
                            {String.fromCharCode(65 + index)}
                        </button>
                    ))}
                </div>
                <button className={`sacrifice-btn`} disabled={this.selectedLetters.length !== 2 || sacrificeMade} onClick={() => this.handleSacrifice() }>
                    <img className='sacrifice-icon' src="./fire.svg" alt="fire-icon" />
                    Sacrifice
                </button>
            </div>
        );
    }
}