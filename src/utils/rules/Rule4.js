import { GenericRule } from "../GenericRule";

export class Rule4 extends GenericRule {
    static instance = new Rule4(this.text);
    
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
    }

    constructor(text) {
        super(text);
        this.number = 4;
        this.desc = "Your password must include a special character.";
    }

    getClass() {
        return Rule4;
    }

    checkRule() {
        this.fulfilled =  /[!@#$%^&*()_+{}[\]:;<>,.?~\\|]/.test(this.text);
    }
}