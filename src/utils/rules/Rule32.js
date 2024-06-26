import { GenericRule } from '../GenericRule'
import { getAllRegexMatches } from '../functions';

export class Rule32 extends GenericRule {
    static instance = new Rule32();

    constructor() {
        super();
        this.number = 32;
        this.desc = 'Your password must include the length of your password.';
    }

    getClass() {
        return Rule32;
    }

    checkRule() {
        const text = this.textController.getClear();
        const numsInText = getAllRegexMatches(text, /\d+/g);

        this.getClass().fulfilled = numsInText.join('').includes(this.textController.getTrueClearLength().toString());
    }
}