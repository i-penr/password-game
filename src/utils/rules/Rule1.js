import { GenericRule } from '../GenericRule'

export class Rule1 extends GenericRule {
    static instance = new Rule1(this.text);

    constructor(text) {
        super(text);
        this.number = 1;
        this.desc = 'Your password must be at least 5 characters.';
    }

    getClass() {
        return Rule1;
    }

    checkRule() {
        this.getClass().fulfilled =  this.text.length >= 5;
    }
}