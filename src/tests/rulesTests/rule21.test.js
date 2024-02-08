import { expect, test } from "bun:test";
import { Rule21 } from "../../utils/rules/Rule21";

test.each([
    ["aaaaa", false],
    ["🏋️‍♂️", false],
    ["🏋️‍♂️🏋️‍♂️🏋️‍♂️", true],
    ["🏋️‍♂️ a 🏋️‍♂️ a 🏋️‍♂️", true]
])("checkRule21(%s)", (s, expected) => {
    const rule = Rule21.getInstance();
    rule.text = s;
    rule.checkRule();

    console.log(rule.text)
    
    expect(Rule21.fulfilled).toBe(expected);
});