import { GenericRule } from '../GenericRule';
import { getAllRegexMatches } from '../functions';
import { TextController } from '../TextController';
import sanitizeHtml from 'sanitize-html';

/*
 *  Rule 19 is special, because here we need the HTML text, not the clear text in order
 *  to check if the bowels are bolded. So we will use another attribute for it: htmlText
 * 
 *  Btw, for me the letter "y" IS NOT a vowel. So I am not going to put it here. My spanish
 *  brain will hurt if I do that.
 */

export class Rule19 extends GenericRule {
    static instance = new Rule19(this.text);
    static htmlText = '';

    constructor(text) {
        super(text);
        this.number = 19;
        this.desc = 'All the vowels in your password must be bolded.';
    }

    getClass() {
        return Rule19;
    }

    getHighlightRule() {
        return new RegExp(/[aeiouAEIOU]/, 'g');
    }

    checkRule() {
        new TextController();

        // Tags like <div> include vowels, which messes up the fulfill condition
        this.getClass().htmlText = sanitizeHtml(TextController.rawText, { allowedTags: ['b'] });

        this.getClass().fulfilled = checkIfAllVowelsAreBolded(this.getClass().htmlText);
    }
}

function checkIfAllVowelsAreBolded(str) {
    let boldZones = str.split("<b>").filter((elem) => elem.includes("</b>"));
    const totalNumOfVowels = getAllRegexMatches(str, Rule19.getInstance().getHighlightRule()).length;
    let sum = 0;

    boldZones.forEach((bold) => {
        const boldedArea = bold.split("</b>")[0]; // left part of </b>

        sum += getAllRegexMatches(boldedArea, Rule19.getInstance().getHighlightRule()).length;
    });

    return sum === totalNumOfVowels;
}