import { GenericRule } from "../GenericRule";

export class Rule3 extends GenericRule {
    static instance = new Rule3();

    constructor() {
        super();
        this.number = 3;
        this.desc = "Your password must include an uppercase letter.";
    }

    getClass() {
        return Rule3;
    }

    checkRule() {
        const text = this.textController.getClear();

        this.getClass().fulfilled =  /[A-Z]/.test(text);
    }
}