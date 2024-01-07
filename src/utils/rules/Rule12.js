import { GenericRule } from '../GenericRule';
import elements from '../atomic-numbers.json';

const elementsWithTwoChars = getElementsWithTwoChars();

export class Rule12 extends GenericRule {
    static instance = new Rule12(this.text);

    constructor(text) {
        super(text);
        this.number = 12;
        this.desc = 'Your password must include a two letter symbol from the periodic table.';
    }

    getClass() {
        return Rule12;
    }

    checkRule() {
        this.getClass().fulfilled = elementsWithTwoChars.some((elem) => this.text.includes(elem) );
    }
}

function getElementsWithTwoChars() {
    const elemObj = JSON.parse(JSON.stringify(elements));
    const keys = Object.keys(elemObj);
    const elementsWithTwoChars = keys.filter((elem) => elem.length === 2);
    
    return elementsWithTwoChars;
}
