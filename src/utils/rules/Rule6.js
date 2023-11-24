import { GenericRule } from "../GenericRule";

export class Rule6 extends GenericRule {
    constructor(text) {
        super(text);
        this.number = 6;
        this.desc = "Your password must include a month of the year.";
    }

    checkRule() {
        this.fulfilled = this.text.search(/january|february|march|april|may|june|july|august|september|october|november|december/i) !== -1;
    }
}