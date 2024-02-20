import { GenericRule } from '../GenericRule';
import elements from '../atomic-numbers.json';

const elementsWithTwoChars = getElementsWithTwoChars();

export class Rule12 extends GenericRule {
    static instance = new Rule12();

    constructor() {
        super();
        this.number = 12;
        this.desc = 'Your password must include a two letter symbol from the periodic table.';
    }

    getClass() {
        return Rule12;
    }

    checkRule() {
        const text = this.textController.getClear();

        this.getClass().fulfilled = elementsWithTwoChars.some((elem) => text.includes(elem) );
    }
}

function getElementsWithTwoChars() {
    const elemObj = JSON.parse(JSON.stringify(elements));
    const keys = Object.keys(elemObj);
    const elementsWithTwoChars = keys.filter((elem) => elem.length === 2);
    
    return elementsWithTwoChars;
}
