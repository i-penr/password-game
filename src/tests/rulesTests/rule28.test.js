import { expect, test } from "bun:test";
import { Rule28 } from "../../utils/rules/Rule28";
import React from "react";

test.each([
    ["a", "#ffffff", false],
    ["a#FfFffF", "#ffffff", true],
    ["ffffffffff", "#ffffff", false],
    ["a", "#ffffff", false],
])("checkRule28(%s)", (s, color, expected) => {
    const rule = Rule28.getInstance();
    Rule28.randomColor = color;
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule28.fulfilled).toBe(expected);
    rule.resetColor();
    expect(Rule28.randomColor).not.toBe(color);
    rule.checkRule();
    expect(Rule28.fulfilled).toBeFalsy();
});