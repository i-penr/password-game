import { GenericRule } from "../GenericRule";

export class Rule4 extends GenericRule {
    static instance = new Rule4();

    constructor() {
        super();
        this.number = 4;
        this.desc = "Your password must include a special character.";
    }

    getClass() {
        return Rule4;
    }

    checkRule() {
        const text = this.textController.getClear();

        this.getClass().fulfilled =  /[!@#$%^&*()_+{}[\]:;<>,.?~"'|]/.test(text);
    }
}