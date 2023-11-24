import { GenericRule } from "../GenericRule";

export class Rule5 extends GenericRule {
    static instance = new Rule5(this.text);
    
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
    }

    constructor(text) {
        super(text);
        this.number = 5;
        this.desc = "The digits in your password must add up to 25.";
    }

    getClass() {
        return Rule5;
    }

    checkRule() {
        const digits = this.text.replace(/\D/g, '').split('').map(Number);
        const sum = digits.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        this.fulfilled = sum === 25;
    }

    highlightLetters() {
        return new RegExp(/[0-9]/, "g");
    }
}