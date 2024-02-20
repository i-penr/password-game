import { expect, test } from "bun:test";
import { Rule17 } from "../../utils/rules/Rule17";

test.each([
    ["a", false],
    ["aaaaa", false],
    ["", false],
    ["aaa🥚aaaa", true]
])("checkRule17(%s)", (s, expected) => {
    const rule = Rule17.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule17.fulfilled).toBe(expected);
});