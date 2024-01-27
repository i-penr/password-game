import { GenericRule } from '../GenericRule'

export class Rule19 extends GenericRule {
    static instance = new Rule19(this.text);

    constructor(text) {
        super(text);
        this.number = 19;
        this.desc = 'All the vowels in your password must be bolded.';
    }

    getClass() {
        return Rule19;
    }

    checkRule() {
    }
}