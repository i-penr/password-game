import { GenericRule } from '../GenericRule';
import { generateHighlightString, getSpanListFromHtmlText } from '../functions';

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

    getHighlightString() {
        const spans = getSpanListFromHtmlText(this.textController.getHtml());
        let highlightString = '';

        [...spans].forEach((section) => {
            const targetNumber = Math.sqrt(parseInt(section.style.fontSize.replace('px', '')));
            const highlight = targetNumber % 1 === 0 ? new RegExp(`[^${targetNumber}\\D]`, 'gi') : /\d/g;

            highlightString += generateHighlightString(section.outerHTML, highlight);
        });

        return highlightString;
    }

    checkRule() {
        this.getClass().fulfilled = numbersHaveRightSize(this.textController.getHtml());
    }
}

function numbersHaveRightSize(text) {
    const spans = getSpanListFromHtmlText(text);

    return ![...spans].some((section) => {
        return !numsInSegmentHaveSizeEqualToTheirSquares(section);
    });
}

function numsInSegmentHaveSizeEqualToTheirSquares(section) {
    const currentFontSize = parseInt(section.style.fontSize.replace('px', ''));
    const numsInSegment = section.innerText.match(/\d/g);

    return numsInSegment === null || numsInSegment.every((num) => parseInt(num) === Math.sqrt(currentFontSize));
}