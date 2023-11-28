import { GenericRule } from "../GenericRule";

export class Rule3 extends GenericRule {
    static instance = new Rule3(this.text);

    constructor(text) {
        super(text);
        this.number = 3;
        this.desc = "Your password must include an uppercase letter.";
    }

    getClass() {
        return Rule3;
    }

    checkRule() {
        this.getClass().fulfilled =  /[A-Z]/.test(this.text);
    }
}