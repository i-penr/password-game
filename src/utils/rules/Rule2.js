import { GenericRule } from '../GenericRule'

export class Rule2 extends GenericRule {
    static instance = new Rule2(this.text);

    constructor(text) {
        super(text);
        this.number = 2;
        this.desc = "Your password must include a number.";
    }

    getClass() {
        return Rule2;
    }

    checkRule() {
        this.getClass().fulfilled =  /\d/.test(this.text);
    }
}