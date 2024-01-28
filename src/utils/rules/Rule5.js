import { GenericRule } from "../GenericRule";
import { getAllRegexMatches } from "../functions";

export class Rule5 extends GenericRule {
    static instance = new Rule5(this.text);

    constructor(text) {
        super(text);
        this.number = 5;
        this.desc = "The digits in your password must add up to 25.";
    }

    getClass() {
        return Rule5;
    }

    checkRule() {
        const digits = getAllRegexMatches(this.text, /\d/g);
        const sum = digits.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);

        this.getClass().fulfilled = sum === 25;
    }

    getHighlightRule() {
        return new RegExp(/\d/, "g");
    }
}