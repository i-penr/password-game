import { expect, test } from "bun:test";
import { Rule20 } from "../../utils/rules/Rule20";

// idk how to test this...

test.each([
    ["a"],
    ["aaaaa"],
    [""],
    ["aaaaaa"]
])("checkRule20(%s)", (s) => {

    const rule = Rule20.getInstance();
    rule.textController.updateText(s);
    rule.textController.startFire();
    
    rule.checkRule();
    
    expect(rule.textController.getClear()).toInclude('🔥');
});