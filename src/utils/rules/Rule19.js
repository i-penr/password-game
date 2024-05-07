import { GenericRule } from '../GenericRule';
import { getFormattedStringsInText, getAllRegexMatches, generateHighlightString } from '../functions';
import sanitizeHtml from 'sanitize-html';

/*
 *  Rule 19 is special, because here we need the HTML text, not the clear text in order
 *  to check if the bowels are bolded. So we will use another attribute for it: htmlText
 * 
 *  Btw, for me the letter "y" IS NOT a vowel. So I am not going to put it here. My spanish
 *  brain will hurt if I do that.
 */

export class Rule19 extends GenericRule {
    static instance = new Rule19();

    constructor() {
        super();
        this.number = 19;
        this.desc = 'All the vowels in your password must be bolded.';
    }

    getClass() {
        return Rule19;
    }

    getHighlightString() {
        return generateHighlightString(this.textController.getHtml(), /[aeiou]/gi, 'strong');
    }

    checkRule() {
        // Tags like <div> include vowels, which messes up the fulfill condition
        const text = sanitizeHtml(this.textController.getHtml(), { allowedTags: ['strong'] })

        this.getClass().fulfilled = checkIfAllVowelsAreBolded(text);
    }
}

function checkIfAllVowelsAreBolded(str) {
    const totalNumOfBoldVowels = countBoldVowelsInText(str);
    const totalNumOfVowels = getAllRegexMatches(str.replace(/<strong>|<\/strong>/g, ''), /[aeiouAEIOU]/g).length;

    return totalNumOfBoldVowels === totalNumOfVowels;
}

function countBoldVowelsInText(text) {
    const boldText = getFormattedStringsInText("strong", text);
    let sum = 0;

    boldText.forEach((str) => {
        const totalNumOfVowels = getAllRegexMatches(str, /[aeiouAEIOU]/g).length;

        sum += totalNumOfVowels;
    });

    return sum;
}