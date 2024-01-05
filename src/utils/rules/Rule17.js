import { GenericRule } from '../GenericRule'

export class Rule17 extends GenericRule {
    static instance = new Rule17(this.text);

    constructor(text) {
        super(text);
        this.number = 17;
        this.desc = "🥚 ← This is my chicken Paul. He hasn't hatched yet, please put him in your password and keep him safe.";
    }

    getClass() {
        return Rule17;
    }

    checkRule() {
        this.getClass().fulfilled =  this.text.includes("🥚");
    }
}