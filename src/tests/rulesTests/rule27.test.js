import { expect, test } from "bun:test";
import { Rule27 } from "../../utils/rules/Rule27";

const span = 'span style="font-family: Wingdings"';

test.each([
    ["a", false],
    [`aaa<${span}>aa</span>`, true],
    ["", true],
    [`<${span}>12</span>3456789<${span}>0</span>`, true]
])("checkRule27(%s)", (s, expected) => {
    const rule = Rule27.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule27.fulfilled).toBe(expected);
});