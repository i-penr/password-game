import { GenericRule } from '../GenericRule';
import { getFormattedStringsInText } from '../functions';

export class Rule27 extends GenericRule {
    static instance = new Rule27();

    constructor() {
        super();
        this.number = 27;
        this.desc = 'At least 30% of your password must be in the Wingdings font.';
    }

    getClass() {
        return Rule27;
    }

    checkRule() {
        const length = this.getClass().getInstance().textController.getTrueClearLength();
        const windings = getFormattedStringsInText('span style="font-family: Wingdings"', this.textController.getHtml());
        const numWindings = countLettersInArray(windings);

        this.getClass().fulfilled = numWindings >= length * 0.3;
    }
}

function countLettersInArray(arr) {
    let sum = 0;

    arr.forEach((elem) => sum += elem.length);

    return sum
} 