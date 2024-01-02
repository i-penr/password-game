import { expect, test } from "bun:test";
import { Rule14 } from "../../utils/rules/Rule14";

// TODO

test.each([
    ["a", false],
    ["aaaaa", false],
    ["", false]
])("checkRule14(%s)", (s, expected) => {
    const rule = Rule14.getInstance();
    rule.text = s;
    rule.checkRule();
    
    expect(Rule14.fulfilled).toBe(expected);
});