import { GenericRule } from '../GenericRule'

/*
 * I think this follows the same logic as Rule 9, where the roman numerals are considered as one unit when joined.
 * 
 * So XX is 20 and not 10 10, which means that here 2004 is a leap year but 20045 isn't, even though it includes
 * 2004.
 */ 

export class Rule15 extends GenericRule {
    static instance = new Rule15(this.text);

    constructor(text) {
        super(text);
        this.number = 15;
        this.desc = 'Your password must include a leap year.';
    }

    getClass() {
        return Rule15;
    }

    checkRule() {
        const digits = extractNumbersFromString(this.text);
        console.log(digits);

        this.getClass().fulfilled = digits && digits.some((elem) => isLeapYear(Number(elem)));
    }
}

function isLeapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function extractNumbersFromString(str) {
    const matches = str.match(/\d+/g);
    if (matches) {
        return matches;
    }
    return [];
}