import { GenericRule } from '../GenericRule';

const affirmations = ["iamloved", "iamworthy", "iamenough"];

export class Rule22 extends GenericRule {
    static instance = new Rule1(this.text);

    constructor(text) {
        super(text);
        this.number = 22;
        this.desc = 'Your password must contain one of the following affirmations:';
    }

    getClass() {
        return Rule1;
    }

    checkRule() {
        this.getClass().fulfilled =  this.text.length >= 5;
    }
}