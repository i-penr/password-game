import { GenericRule } from '../GenericRule';

export class Rule28 extends GenericRule {
    static instance = new Rule28();

    constructor() {
        super();
        this.number = 28;
        this.desc = 'Your password must include this color in hex.';
    }

    getClass() {
        return Rule28;
    }

    checkRule() {
        this.getClass().fulfilled =  this.textController.getTrueClearLength() >= 5;
    }
}