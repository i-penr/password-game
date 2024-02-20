import { GenericRule } from '../GenericRule'

export class Rule2 extends GenericRule {
    static instance = new Rule2();

    constructor() {
        super();
        this.number = 2;
        this.desc = "Your password must include a number.";
    }

    getClass() {
        return Rule2;
    }

    checkRule() {
        const text = this.textController.getClear();

        this.getClass().fulfilled =  /\d/.test(text);
    }
}