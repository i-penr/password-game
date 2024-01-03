import { expect, test } from "bun:test";
import { Rule14 } from "../../utils/rules/Rule14";

const rule = Rule14.getInstance();

test.each([
    ["a", false],
    ["aaaaa", false],
    ["", false],
    [`aa${Rule14.randomPlace.title}aa`, true],
    [`aaBosnia and Herzegovina${Rule14.randomPlace.title}aa`, true]
])("checkRule14(%s)", (s, expected) => {
    rule.text = s;
    rule.checkRule();
    
    expect(Rule14.fulfilled).toBe(expected);
});