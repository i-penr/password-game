import { GenericRule } from '../GenericRule';
import elements from '../atomic-numbers.json';
import { getAllRegexMatches } from '../functions';

export class Rule18 extends GenericRule {
    static instance = new Rule18(this.text);

    constructor(text) {
        super(text);
        this.number = 18;
        this.desc = 'The elements in your password must have atomic numbers that add up to 200.';
    }

    getClass() {
        return Rule18;
    }

    getHighlightRule() {
        // Look, if you are better than this, show me, please.
        return new RegExp(/He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|V|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Y|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|I|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Th|Pa|U|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og|H|B|C|N|O|F/ , "g");
    }


    checkRule() {
        const elementsOnText = getAllRegexMatches(this.text, this.getHighlightRule());
        const sum = sumElems(elementsOnText);

        this.getClass().fulfilled = sum === 200;
    }
}

function sumElems(arr) {
    let sum = 0;

    arr.forEach(elem => {
        sum += elements[elem];
    });

    return sum;
}