import { expect, test } from "bun:test";
import { Rule22 } from "../../utils/rules/Rule22";

test.each([
    ["aaaaa", false],
    ["iamloved", true],
    ["iamenough", true],
    ["iamworthy", true],
    ["IAMLOVeD", true],
    ["I AM LOVeD", true],
    ["IAM LOVeD", true],
])("checkRule22(%s)", (s, expected) => {
    const rule = Rule22.getInstance();
    rule.text = s;
    rule.checkRule();
    
    expect(Rule22.fulfilled).toBe(expected);
});