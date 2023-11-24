import { expect, test } from "bun:test";
import { Rule1 } from "../../utils/rules/Rule1";

test.each([
    ["a", false],
    ["aaaaa", true],
    ["", false],
    ["aaaaaa", true]
])("checkRule1(%s)", (s, expected) => {
    const rule = new Rule1(s);
    rule.checkRule();
    
    expect(rule.fulfilled).toBe(expected);
});