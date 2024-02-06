import { GenericRule } from '../GenericRule'

export class Rule20 extends GenericRule {
    static instance = new Rule20(this.text);

    constructor(text) {
        super(text);
        this.number = 20;
        this.desc = 'Oh no! Your password is on fire. Quick, put it out!';
    }

    getClass() {
        return Rule20;
    }

    checkRule() {
        this.getClass().fulfilled = !this.text.includes('🔥');
    }
}