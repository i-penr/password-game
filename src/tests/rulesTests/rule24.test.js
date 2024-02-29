import { expect, test } from "bun:test";
import { Rule24 } from "../../utils/rules/Rule24";

test("checkRule24", () => {
    const rule = Rule24.getInstance();
    rule.textController.updateText("https://www.youtube.com/watch?v=ewOPQZZn4SY");
    rule.checkRule();
    
    if (rule.minute === 4 && rule.second === 48) {
        expect(rule.fulfilled).toBeTruthy();
    } else {
        expect(rule.fulfilled).toBeFalsy();
    }
});