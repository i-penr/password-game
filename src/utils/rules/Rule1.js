import { GenericRule } from '../GenericRule'

export class Rule1 extends GenericRule {
    constructor(text) {
        super(text);
        this.number = 1;
        this.desc = 'Your password must be at least 5 characters.';
    }

    checkRule() {
        this.fulfilled =  this.text.length >= 5;
    }
}