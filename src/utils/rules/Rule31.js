import { GenericRule } from '../GenericRule';
import { generateHighlightStringForRule31, getSpanListFromHtmlText } from '../functions';

export class Rule31 extends GenericRule {
    static instance = new Rule31();

    constructor() {
        super();
        this.number = 31;
        this.desc = 'Every instance of the same letter must have a different font size.';
    }

    getClass() {
        return Rule31;
    }

    getHighlightString() {
        const htmlText = this.textController.getHtml();
        const spans = getSpanListFromHtmlText(htmlText);
        const sectionsBySize = groupSectionsBySize(spans);
        const resultString = highlightStringBySections(sectionsBySize, htmlText);

        return resultString;
    }

    checkRule() {
        const repeated = repeatedLettersHaveSameSize(this.textController.getHtml());

        this.getClass().fulfilled = repeated;
    }
}

/**
 * The position of the words are not important, so the idea is 
 * to have an array sectionsBySize where each element 
 * represents the union of sections of the same size in the 
 * text.
 **/
function repeatedLettersHaveSameSize(htmlText) {
    const spans = getSpanListFromHtmlText(htmlText);

    const sectionsBySize = groupSectionsBySize(spans);

    return Object.values(sectionsBySize).every((section) => {
        return !hasRepeats(section);
    });
}

function groupSectionsBySize(sections) {
    const groupped = Object.groupBy(sections, ({ style }) => style.fontSize);

    Object.keys(groupped).forEach((key) => {
        groupped[key] = groupped[key].map((obj) => obj.innerText).join('');
    });

    return groupped;
}

function highlightStringBySections(group, htmlText) {
    Object.keys(group).forEach((size) => {
        const section = group[size];
        let repeated = {};

        for (const char of section) {
            if (!/[a-z]/i.test(char)) continue;

            if (Object.keys(repeated).includes(char)) {
                repeated[char] += 1;
            } else {
                repeated[char] = 1;
            }
        }

        repeated = removeNonRepeated(repeated);

        Object.keys(repeated).forEach((letter) => {
            htmlText = generateHighlightStringForRule31(htmlText, size, letter);
        });
    });

    return htmlText; 
}

function removeNonRepeated(repeated) {
    Object.keys(repeated).forEach((key) => {
        if (repeated[key] === 1)
            delete repeated[key];
    });

    return repeated;
}

function hasRepeats(str) {
    return /([a-z]).*\1/i.test(str);
}