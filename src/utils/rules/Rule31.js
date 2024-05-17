import { GenericRule } from '../GenericRule';
import { extractAndMergeTextWithFontSizes, generateHighlightString } from '../functions';

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
        const sectionsBySize = extractAndMergeTextWithFontSizes(this.textController.editor.getJSON());
        let highlightedLetters = [];

        Object.values(sectionsBySize).forEach((section) => {
            highlightedLetters = highlightedLetters.concat(findRepeatedLetters(section.toLowerCase()));
        });

        highlightedLetters = highlightedLetters.filter((letter) => letter.match(/[a-z]/gi));

        const highlightedString = generateHighlightString(this.textController.getHtml(), new RegExp(`${highlightedLetters.join('|')}`, 'gi'));

        return highlightedString;
    }

    checkRule() {
        const repeated = repeatedLettersHaveSameSize(this.textController.editor.getJSON());
        
        this.getClass().fulfilled = repeated;
    }
}

/**
 * The position of the words are not important, so the idea is 
 * to have an array sectionsBySize where each element 
 * represents the union of sections of the same size in the 
 * text.
 **/
function repeatedLettersHaveSameSize(json) {
    const sectionsBySize = extractAndMergeTextWithFontSizes(json);


    return Object.values(sectionsBySize).every((section) => {
        const letters = section.match(/[a-z]/gi);

        return !letters ? true : !hasRepeats(letters.join(''));
    });
}

function findRepeatedLetters(inputString) {
    const repeatedLetters = [];
    const uniqueChars = new Set();
  
    // Iterate through each character in the string
    for (let char of inputString) {
      // If the character is already in the uniqueChars set, it's a repeat
      if (uniqueChars.has(char)) {
        // If the character is not already in the repeatedLetters array, add it
        if (!repeatedLetters.includes(char)) {
          repeatedLetters.push(char);
        }
      } else {
        // If the character is not in the uniqueChars set, add it
        uniqueChars.add(char);
      }
    }
  
    return repeatedLetters;
  }
function hasRepeats(str) {
    return /([a-z]).*\1/i.test(str);
}