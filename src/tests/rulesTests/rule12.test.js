import { expect, test } from "bun:test";
import { Rule12 } from "../../utils/rules/Rule12";

test.each([
    ["a", false],
    ["Fe", true],
    ["", false],
    ["FE", false],
    ["aaaaFeaaaaa", true]
])("checkRule12(%s)", (s, expected) => {
    const rule = Rule12.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule12.fulfilled).toBe(expected);
});