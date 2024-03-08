import { GenericRule } from '../GenericRule';
import sanitizeHtml from 'sanitize-html';

export class Rule26 extends GenericRule {
    static instance = new Rule26();

    constructor() {
        super();
        this.number = 26;
        this.desc = 'Your password must contain twice as many italic characters as bold.';
    }

    getClass() {
        return Rule26;
    }

    checkRule() {
        const text = this.textController.htmlText;
        const numBold = countFormatedLetters(text, 'b');
        const numItalic = countFormatedLetters(text, 'i');

        this.getClass().fulfilled = numBold * 2 <= numItalic;
    }
}

function countFormatedLetters(str, formatTag) {
    let boldZones = str.split(`<${formatTag}>`).filter((elem) => elem.includes(`</${formatTag}>`));
    let sum = 0;

    boldZones.forEach((bold) => {
        // We don't want to count inside tags of other formats, so we sanitize (ex: <i><b>aa</b>dd</i>)
        const boldedArea = sanitizeHtml(bold.split(`</${formatTag}>`)[0], { allowedTags: [] });

        sum += boldedArea.length;
    });

    return sum;
}