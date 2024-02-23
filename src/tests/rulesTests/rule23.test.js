import { expect, test } from "bun:test";
import { Rule23 } from "../../utils/rules/Rule23";

// To be tested...

test.each([
    ["a", false],
    ["aaaaa", true],
    ["", false],
    ["aaaaaa", true]
])("checkRule23(%s)", (s, expected) => {
    const rule = Rule23.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
});