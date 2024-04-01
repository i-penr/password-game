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

    getHighlightRule() {
        return /\d/g;
    }

    checkRule() {
        this.getClass().fulfilled = numbersHaveRightSize(this.textController.getHtml());
    }
}

// This is very sketchy
function numbersHaveRightSize(text) {
    // Similar case as with HiglightedText
    const tagSplit = text.split(/(<[^>]+>)/g);
    let currentFontSize;
    let insideSpan = false;

    for (const elem of tagSplit) {
        if (elem.match(/(<span.*?>)/)) {
            currentFontSize = parseInt(/font-size:\s*([\d.]+)px/.exec(elem)[1]) ?? 28;
            insideSpan = true;
        } else if (insideSpan) {
            const numsInSegment = elem.match(/\d/g);
            insideSpan = false;

            if (numsInSegmentHaveSizeEqualToTheirSquares(numsInSegment, currentFontSize)) {
                return false;
            }
        } else if (elem.match(/\d/)) {
            return false;
        }
    }

    return true;
}

function numsInSegmentHaveSizeEqualToTheirSquares(numsInSegment, currentFontSize) {
    return numsInSegment !== null && numsInSegment.every((num) => parseInt(num) !== Math.sqrt(currentFontSize));
}
