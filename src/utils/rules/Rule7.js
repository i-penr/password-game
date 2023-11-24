import { GenericRule } from '../GenericRule'

export class Rule7 extends GenericRule {
    constructor(text) {
        super(text);
        this.number = 7;
        this.desc = "Your password must include a roman numeral.";
    }

    checkRule() {
        this.fulfilled = this.text.search(/I|V|X|L|C|D|M/) !== -1;
    }
}