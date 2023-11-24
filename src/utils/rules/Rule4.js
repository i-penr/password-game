import { GenericRule } from "../GenericRule";

export class Rule4 extends GenericRule {
    constructor(text) {
        super(text);
        this.number = 4;
        this.desc = "Your password must include a special character.";
    }

    checkRule() {
        this.fulfilled =  /[!@#$%^&*()_+{}[\]:;<>,.?~\\|]/.test(this.text);
    }
}