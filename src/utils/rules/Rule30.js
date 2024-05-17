import { GenericRule } from '../GenericRule';
import { extractAndMergeTextWithFontSizes } from '../functions';

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
        const regexSimpleMarkup = /(<[^>]+>)/g;
        const markupSplit = this.textController.getHtml().split(regexSimpleMarkup).filter((elem) => elem.length > 0);
        let resultText = "";
        let currentFontSize = 28;

        markupSplit.forEach((part) => {
            if ((part.startsWith("<") && part.endsWith(">"))) {
                currentFontSize = /.*font-size.*/.test(part) ? parseInt(part.match(/font-size:\s*(\d+)px/i)[1]) : 28;
                resultText += part;
            } else {
                const highlight = Math.sqrt(currentFontSize) % 1 === 0 ? new RegExp(`[^${Math.sqrt(currentFontSize)}\\D]`, 'gi') : /\d/g;
                resultText += part.replace(highlight, '<span class="error-highlight">$&</span>');
            }
        });

        return resultText;
    }

    checkRule() {
        const numbersBySize = extractAndMergeTextWithFontSizes(this.textController.editor.getJSON());

        this.getClass().fulfilled = checkSquareRoots(numbersBySize);
    }
}

function checkSquareRoots(textWithFontSizes) {
    return Object.keys(textWithFontSizes).every((size) => {
        return sizeIncludesTheRightNumbers(size, textWithFontSizes[size])
    })
}
function sizeIncludesTheRightNumbers(size, numbers) {
    const numsInSegment = numbers.match(/\d/g);

    return numsInSegment === null || numsInSegment.every((num) => parseInt(num) === Math.sqrt(size));
}