import { expect, test } from "bun:test";
import { Rule33 } from "../../utils/rules/Rule33";

test.each([
    ["a", false],
    ["aa", true],
    ["aaa", true],
    ["", false],
    ["aaaa", false],
    ["aaaaaaaaaaaaaaaaaaa", true]
])("checkRule33(%s)", (s, expected) => {
    const rule = Rule33.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule33.fulfilled).toBe(expected);
});