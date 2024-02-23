import { GenericRule } from '../GenericRule'

export class Rule34 extends GenericRule {
    static instance = new Rule34();

    constructor() {
        super();
        this.number = 34;
        this.desc = 'Uhh let\'s skip this one.';
    }

    getClass() {
        return Rule34;
    }

    checkRule() {
        this.getClass().fulfilled =  true;
    }
}