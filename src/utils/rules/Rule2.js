import { GenericRule } from '../GenericRule'

export class Rule2 extends GenericRule {
    constructor(text) {
        super(text);
        this.number = 2;
        this.desc = "Your password must include a number.";
    }

    checkRule() {
        this.fulfilled =  /\d/.test(this.text);
    }
}