import { expect, test } from "bun:test";
import { Rule15 } from "../../utils/rules/Rule15";

test.each([
    ["a", false],
    ["aaaaa", false],
    ["", false],
    ["0", true],
    ["00a2002", true],
    ["2002", false],
    ["2024", true],
    ["202435", false],
    ["352024", true],
])("checkRule15(%s)", (s, expected) => {
    const rule = Rule15.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule15.fulfilled).toBe(expected);
});