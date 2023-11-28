import { GenericRule } from '../GenericRule'

export class Rule7 extends GenericRule {
    static instance = new Rule7(this.text);

    constructor(text) {
        super(text);
        this.number = 7;
        this.desc = "Your password must include a roman numeral.";
    }

    getClass() {
        return Rule7;
    }

    checkRule() {
        this.getClass().fulfilled = this.text.search(/I|V|X|L|C|D|M/) !== -1;
    }
}