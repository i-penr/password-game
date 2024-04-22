import { GenericRule } from '../GenericRule';

export class Rule30 extends GenericRule {
    static instance = new Rule30();

    constructor() {
        super();
        this.number = 30;
        this.desc = 'The font size of every digit must be equal to its square.';
    }

    getClass() {
        return Rule30;
    }

    getHighlight() {
        return /\d/g;
    }

    checkRule() {
        this.getClass().fulfilled = numbersHaveRightSize(this.textController.getHtml());
    }
}

function numbersHaveRightSize(text) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const spans = tempDiv.querySelectorAll('span') ?? text;

    return [...spans].some((section) => {
        const currentFontSize = parseInt(section.style.fontSize.replace('px', ''));
        const numsInSegment = section.innerText.match(/\d/g);

        return numsInSegmentHaveSizeEqualToTheirSquares(numsInSegment, currentFontSize);
    });
}

function numsInSegmentHaveSizeEqualToTheirSquares(numsInSegment, currentFontSize) {
    return numsInSegment === null || numsInSegment.every((num) => parseInt(num) === Math.sqrt(currentFontSize));
}
