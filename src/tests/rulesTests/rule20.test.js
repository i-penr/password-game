import { expect, test } from "bun:test";
import { Rule20 } from "../../utils/rules/Rule20";
import { TextController } from "../../utils/TextController";

// idk how to test this...

test.each([
    ["a", true],
    ["aaaaa", true],
    ["", true],
    ["aaaaaa", true]
])("checkRule20(%s)", (s, expected) => {
    new TextController(() => {});
    TextController.updateText(s);

    const rule = Rule20.getInstance();
    rule.text = s;
    TextController.startFire();
    
    rule.checkRule();
    
    expect(Rule20.fulfilled).toBe(expected);
});