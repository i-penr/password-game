import { expect, test } from "bun:test";
import { Rule18 } from "../../utils/rules/Rule18";

test.each([
    ["a", false],
    ["aaaaa", false],
    ["", false],
    ["FmFm", true],
    ["FmFmH", false]
])("checkRule18(%s)", (s, expected) => {
    const rule = Rule18.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule18.fulfilled).toBe(expected);
});