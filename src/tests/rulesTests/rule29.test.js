import { expect, test } from "bun:test";
import { Rule29 } from "../../utils/rules/Rule29";

const span = '<span style="font-family: Times\\ New\\ Roman">';
const wrongSpan = '<span style="font-family: Wingdings">';

test.each([
    ["a", true],
    ["", true],
    ["X", false],
    [`${span}X</span>`, true],
    [`${span}X</span>XxsadsaX`, false],
    [`${span}XXXV</span>sadsa`, true],
    ["aaaXXXaaa", false],
    [`fdsa${wrongSpan}fsa</span>fasasd${span}XXV</span>`, true],
    [`${wrongSpan}XXXV</span>sadsa`, false],
    [`${wrongSpan}XXXV</span>s${span}a</span>dsa`, false],
])("checkRule29(%s)", (s, expected) => {
    const rule = Rule29.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule29.fulfilled).toBe(expected);
});