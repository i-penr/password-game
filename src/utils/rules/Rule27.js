import { GenericRule } from '../GenericRule';

export class Rule27 extends GenericRule {
    static instance = new Rule27();

    constructor() {
        super();
        this.number = 27;
        this.desc = 'At least 30% of your password must be in the Wingdings font.';
    }

    getClass() {
        return Rule27;
    }

    checkRule() {
        this.getClass().fulfilled =  this.textController.getTrueClearLength() >= 5;
    }
}