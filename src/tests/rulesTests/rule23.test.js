import { test, expect } from "bun:test";
import { Rule23 } from "../../utils/rules/Rule23";

test("checkRule23()", async () => {
    const rule = Rule23.getInstance();
    rule.textController.updateText('🐛🐛🐛');
    rule.checkRule();

    await Bun.sleep(15000);

    expect(rule.textController.getClear()).toBe('🐛🐛');
    expect(Rule23.fulfilled).toBeTruthy();
}, 16000);