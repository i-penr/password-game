import { expect, test } from "bun:test";
import { Rule26 } from "../../utils/rules/Rule26";

test.each([
    ["<b>a</b>", false],
    ["aaaaa", true],
    ["<b>a</b><i>a</i>", false],
    ["<b>aa</b>fdasfdasfdsas<i>bbbb</i>", true],
    ["<b>aa</b><i>bbbbb</i>", true],
    ["<i><b>aa</b>bb</i>", true]
])("checkRule26(%s)", (s, expected) => {
    const rule = Rule26.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule26.fulfilled).toBe(expected);
});