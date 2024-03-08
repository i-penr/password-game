import { GenericRule } from '../GenericRule';

export class Rule28 extends GenericRule {
    static instance = new Rule28();
    static randomColor = getRandomColor();

    constructor() {
        super();
        this.number = 28;
        this.desc = 'Your password must include this color in hex.';
    }

    getClass() {
        return Rule28;
    }

    checkRule() {
        console.log(Rule28.randomColor)
        this.getClass().fulfilled = this.textController.clearText.toLowerCase().includes(this.getClass().randomColor);
    }

    resetColor() {
        this.getClass().randomColor = getRandomColor();
        this.forceUpdate();
        this.textController.updateText(this.textController.rawText);
    }

    render() {
        return (
            <div className="rand-color" style={{background: `${hexToRgb(this.getClass().randomColor)}`}}>
                <img src="refresh.svg" className="refresh" alt='refresh-btn' onClick={() => this.resetColor()}/>
            </div>
        )
    }
}

function getRandomColor() {
    let letters = '0123456789abcdef';
    let color = '#';
    // To nerf this a little bit, i am going to add a 10% chance that the color generated does not contain letters, so it does not conflict with other rules.
    const forceOnlyLetterColor = Math.floor(Math.random()*10) === 0;

    if (forceOnlyLetterColor) {
        letters = letters.slice(-6);
    }

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function hexToRgb(hex) {
    hex = hex.substring(1);
    const rgb = [`${hex[0]}${hex[1]}`, `${hex[2]}${hex[3]}`, `${hex[4]}${hex[5]}`];

    return `rgb(${parseInt(rgb[0], 16)}, ${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)})`;
}