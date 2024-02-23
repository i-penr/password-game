import { expect, test } from "bun:test";
import { Rule32 } from "../../utils/rules/Rule32";

test.each([
    ["a", false],
    ["aaaaa6", true],
    ["", false],
    ["0", false],
    ["1", true]
])("checkRule32(%s)", (s, expected) => {
    const rule = Rule32.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule32.fulfilled).toBe(expected);
});