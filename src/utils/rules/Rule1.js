import { GenericRule } from '../GenericRule'

export class Rule1 extends GenericRule {
    static instance = new Rule1();

    constructor() {
        super();
        this.number = 1;
        this.desc = 'Your password must be at least 5 characters.';
    }

    getClass() {
        return Rule1;
    }

    checkRule() {
        this.getClass().fulfilled =  this.textController.getTrueClearLength() >= 5;
    }
}