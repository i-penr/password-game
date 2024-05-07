import { GenericRule } from '../GenericRule';
import { generateHighlightString, getAllRegexMatches, getSubstringsWithFont } from '../functions';

export class Rule29 extends GenericRule {
    static instance = new Rule29();

    constructor() {
        super();
        this.number = 29;
        this.desc = 'All roman numerals must be in Times New Roman.';
    }

    getClass() {
        return Rule29;
    }

    getHighlightString() {
        return generateHighlightString(this.textController.getHtml(), /[IVXLCDM]/g, 'span style="[^"]*font-family: Times\\\\ New\\\\ Roman.*?"');
    }

    checkRule() {
        const numRomanNumerals = getAllRegexMatches(this.textController.getClear(), /I|V|X|L|C|D|M/g).length;
        const numFormatedNumerals = getNumeralsInTimesNewRoman(this.textController.getHtml());

        this.getClass().fulfilled =  numRomanNumerals === numFormatedNumerals;
    }
}

function getNumeralsInTimesNewRoman(text) {
    const textInTNR = getSubstringsWithFont('Times\\\\ New\\\\ Roman', text);
    let sum = 0;

    textInTNR.forEach((str) => {
        sum += getAllRegexMatches(str, /I|V|X|L|C|D|M/g).length;
    });

    return sum;
}