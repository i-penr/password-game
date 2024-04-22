import { GenericRule } from '../GenericRule';
import elements from '../atomic-numbers.json';
import { getAllRegexMatches } from '../functions';

export class Rule18 extends GenericRule {
    static instance = new Rule18();

    constructor() {
        super();
        this.number = 18;
        this.desc = 'The elements in your password must have atomic numbers that add up to 200.';
    }

    getClass() {
        return Rule18;
    }

    getHighlight() {
        return new RegExp(Object.keys(elements).join("|"), "g");
    }


    checkRule() {
        const text = this.textController.getClear();
        const elementsOnText = getAllRegexMatches(text, this.getHighlight());
        const sum = sumElems(elementsOnText);

        this.getClass().fulfilled = sum === 200;
    }
}

function sumElems(arr) {
    let sum = 0;

    arr.forEach(elem => {
        sum += elements[elem];
    });

    return sum;
}