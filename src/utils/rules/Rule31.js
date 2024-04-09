import { GenericRule } from '../GenericRule';

export class Rule31 extends GenericRule {
    static instance = new Rule31();

    constructor() {
        super();
        this.number = 31;
        this.desc = 'Every instance of the same letter must have a different font size.';
    }

    getClass() {
        return Rule31;
    }

    checkRule() {
        const repeated = repeatedLettersHaveSameSize(this.textController.htmlText);

        this.getClass().fulfilled = repeated;
    }
}

/**
 * The position of the words are not important, so the idea is 
 * to have an array sectionsBySize where each element 
 * represents the union of sections of the same size in the 
 * text.
 **/
function repeatedLettersHaveSameSize(htmlText) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    const spans = tempDiv.querySelectorAll('span');

    const sectionsBySize = groupSectionsBySize(spans)

    return sectionsBySize.every((section) => {
        return !hasRepeats(section);
    });
}

function groupSectionsBySize(sections) {
    const groupped = Object.groupBy(sections, ({style}) => style.fontSize);

    return Object.values(groupped).map(group => {
        return group.map(obj => obj.innerText).join('');
    });
}

function hasRepeats(str) {
    return (/([a-z])\1/i).test(str);
}