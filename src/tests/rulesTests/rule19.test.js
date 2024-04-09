import { expect, test } from "bun:test";
import { Rule19 } from "../../utils/rules/Rule19";

test.each([
    ["a", false],
    ["<strong>aaaaa</strong>", true],
    ["<strong>a</strong><strong>a</strong><strong>afdsafkj</strong>", true],
    ["<strong>a</strong><strong>a</strong><strong>afdsafkj</strong>a", false],
    ["hola que tal", false],
    ["h<strong>o</strong>l<strong>a</strong> q<strong>ue</strong> t<strong>a</strong>l", true],
])("checkRule19(%s)", (s, expected) => {
    const rule = Rule19.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule19.fulfilled).toBe(expected);
});