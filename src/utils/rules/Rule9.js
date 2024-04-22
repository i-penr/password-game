import { GenericRule } from '../GenericRule'

const romanNumerals = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
};

export class Rule9 extends GenericRule {
    static instance = new Rule9();

    constructor() {
        super();
        this.number = 9;
        this.desc = "The roman numerals in your password should multiply to 35.";
    }

    getClass() {
        return Rule9;
    }

    getHighlight() {
        return new RegExp(/I|V|X|L|C|D|M/, "g");
    }

    /*
     *  I know that I could have accomplish this by just checking if the text contains XXXV and no other numerals except I or 
     *  if it contains V, VII and no other numerals, but this way is more epic and fulfilling. 
     */
    checkRule() {
        const numeralList = this.findNumeralsInText();

        this.getClass().fulfilled = multiplyArrayContent(numeralList) === 35;
    }
    
    findNumeralsInText() {
        const text = this.textController.getClear();

        let foundNumeral = "";
        let numeralList = [];
        let i = 0;

        while (i < text.length || foundNumeral.length > 0) {
            const c = text.charAt(i);

            if (checkValidNumeral(c)) {
                if (consecutiveRomanNumeralsAreInvalid(foundNumeral, c) || substractionCaseIsInvalid(foundNumeral, c) || alreadyHasSubstractionCase(foundNumeral)) {
                    numeralList.push(calculateRomanNumeralValue(foundNumeral));
                    foundNumeral = "";
                }

                foundNumeral += c;
            } else if (foundNumeral.length > 0) {
                numeralList.push(calculateRomanNumeralValue(foundNumeral));
                foundNumeral = "";
            }
            i++;
        }

        return numeralList;
    }
}


function checkValidNumeral(num) {
    const regex = new RegExp(/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/);
    return regex.test(num) && num.length > 0;
}

function consecutiveRomanNumeralsAreInvalid(fullNumeral, newChar) {
    // Sequential Vs, Ls or Ds are not accepted in roman numerals (VV is not 10, that's just X)
    return fullNumeral.at(-1) === newChar && ((newChar === 'V' || newChar === 'L' || newChar === 'D') || fullNumeral.endsWith(newChar + newChar + newChar));
}

// "Substraction Case" => IX, XL...
function substractionCaseIsInvalid(fullNumeral, newChar) {
    const lastChar = fullNumeral.at(-1);

    return weAreOnSubstractionCase(lastChar, newChar) && !substractionCaseIsValid(lastChar, newChar);
}

// If a numeral already has substraction case (XIX, IX, XL...) the following characters are treated as another numeral (XIXX is [19, 10]).
function alreadyHasSubstractionCase(fullNumeral) {
    const lastChar = fullNumeral.at(-1);
    const secondToLastChar = fullNumeral.at(-2);

    return weAreOnSubstractionCase(secondToLastChar, lastChar) && substractionCaseIsValid(secondToLastChar, lastChar);
}

function weAreOnSubstractionCase(secondToLastChar, lastChar) {
    return romanNumerals[secondToLastChar] < romanNumerals[lastChar];
}

function substractionCaseIsValid(secondToLastChar, lastChar) {
    return !(lastChar === 'V' || lastChar === 'L' || lastChar === 'D') && romanNumerals[lastChar] / 10 >= romanNumerals[secondToLastChar]
}

function calculateRomanNumeralValue(str) {
    let num = 0;
    let current = "";

    for (let c of str) {
        const lastCharValue = romanNumerals[current.at(-1)];

        if (lastCharValue < romanNumerals[c]) { // Substraction case
            num -= lastCharValue * 2;
        }

        num += romanNumerals[c];
        current += c;
    }

    return num === 0 ? null : num;
}

function multiplyArrayContent(arr) {
    let multi = 1;

    for (let num of arr) {
        multi *= num;
    }

    return multi;
}