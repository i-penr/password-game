import { GenericRule } from '../GenericRule';

const elementsWithTwoChars = [
    "Ac", "Al", "Am", "Sb", "Ar", "As", "At", "Ba", "Bk", "Be", "Bi", "Bh", "Zr",
    "Br", "Cd", "Ca", "Cf", "Ce", "Cs", "Cl", "Cr", "Co", "Cn", "Cu", "Cm", "Ds",
    "Db", "Dy", "Es", "Er", "Eu", "Fm", "Fl", "Fr", "Gd", "Ga", "Ge", "Au", "Hf",
    "Hs", "He", "Ho", "In", "Ir", "Fe", "Kr", "La", "Lr", "Pb", "Li", "Lv", "Lu",
    "Mg", "Mn", "Mt", "Md", "Hg", "Mo", "Mc", "Nd", "Ne", "Np", "Ni", "Nh", "Nb",
    "No", "Og", "Os", "Pd", "Pt", "Pu", "Po", "Pr", "Pm", "Pa", "Ra", "Rn", "Re",
    "Rh", "Rg", "Rb", "Ru", "Rf", "Sm", "Sc", "Sg", "Se", "Si", "Ag", "Na", "Sr",
    "Ta", "Tc", "Te", "Ts", "Tb", "Tl", "Th", "Tm", "Sn", "Ti", "Xe", "Yb", "Zn"
];

export class Rule12 extends GenericRule {
    static instance = new Rule12(this.text);

    constructor(text) {
        super(text);
        this.number = 12;
        this.desc = 'Your password must include a two letter symbol from the periodic table.';
    }

    getClass() {
        return Rule12;
    }

    checkRule() {
        this.getClass().fulfilled = elementsWithTwoChars.some((elem) => this.text.includes(elem) );
    }
}