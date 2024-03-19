import { GenericRule } from '../GenericRule';
import { getAllRegexMatches, getFormattedStringsInText } from '../functions';

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

    getHighlightRule() {
        return /I|V|X|L|C|D|M/g;
    }

    checkRule() {
        const numRomanNumerals = getAllRegexMatches(this.textController.getClear(), /I|V|X|L|C|D|M/g).length;
        const numFormatedNumerals = getNumeralsInTimesNewRoman(this.textController.getHtml());

        this.getClass().fulfilled =  numRomanNumerals === numFormatedNumerals;
    }
}

function getNumeralsInTimesNewRoman(text) {
    const textInTNR = getFormattedStringsInText('span style="font-family: Times\\ New\\ Roman"', text);
    let sum = 0;

    textInTNR.forEach((str) => {
        console.log(str)
        sum += getAllRegexMatches(str, /I|V|X|L|C|D|M/g).length;
    });

    return sum;
}