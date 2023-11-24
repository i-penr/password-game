import { GenericRule } from "../GenericRule";

export class Rule3 extends GenericRule {
    constructor(text) {
        super(text);
        this.number = 3;
        this.desc = "Your password must include an uppercase letter.";
    }

    checkRule() {
        this.fulfilled =  /[A-Z]/.test(this.text);
    }
}