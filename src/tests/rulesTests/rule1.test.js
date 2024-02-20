import { expect, test } from "bun:test";
import { Rule1 } from "../../utils/rules/Rule1";

test.each([
    ["a", false],
    ["aaaaa", true],
    ["", false],
    ["aaaaaa", true]
])("checkRule1(%s)", (s, expected) => {
    const rule = Rule1.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule1.fulfilled).toBe(expected);
});