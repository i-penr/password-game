import { expect, test } from "bun:test";
import { Rule25 } from "../../utils/rules/Rule25";

test.each([
    ['aaaa', ["a", "b"], false],
    ['bbbb', ["a", "b"], false],
    ['cccc', ["a", "b"], true],
    ['', ["a", "b"], true],
    ['wxaaa', ["w", "x"], false],
])("checkRule25(%s)", (s, sacrificedLetters, expected) => {
    const rule = Rule25.getInstance();
    Rule25.sacrificedLetters = sacrificedLetters;
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule25.fulfilled).toBe(expected);
});