import { GenericRule } from '../GenericRule'

export class Rule2 extends GenericRule {
    static instance = new Rule2(this.text);
    
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
    }

    constructor(text) {
        super(text);
        this.number = 2;
        this.desc = "Your password must include a number.";
    }

    getClass() {
        return Rule2;
    }

    checkRule() {
        this.fulfilled =  /\d/.test(this.text);
    }
}