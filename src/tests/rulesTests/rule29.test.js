import { expect, test } from "bun:test";
import { Rule29 } from "../../utils/rules/Rule29";

const span = '<span style="font-family: Times\\ New\\ Roman">'

test.each([
    ["a", true],
    ["", true],
    ["X", false],
    [`${span}X</span>`, true],
    [`${span}X</span>XxsadsaX`, false],
    [`${span}XXXV</span>sadsa`, true],
    ["aaaXXXaaa", false]
])("checkRule29(%s)", (s, expected) => {
    const rule = Rule29.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule29.fulfilled).toBe(expected);
});