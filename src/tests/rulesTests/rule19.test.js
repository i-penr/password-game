import { expect, test } from "bun:test";
import { Rule19 } from "../../utils/rules/Rule19";

test.each([
    ["a", false],
    ["<b>aaaaa</b>", true],
    ["<b>a</b><b>a</b><b>afdsafkj</b>", true],
    ["<b>a</b><b>a</b><b>afdsafkj</b>a", false],
    ["hola que tal", false],
    ["h<b>o</b>l<b>a</b> q<b>ue</b> t<b>a</b>l", true],
])("checkRule19(%s)", (s, expected) => {
    const rule = Rule19.getInstance();
    rule.htmlText = s;
    rule.checkRule();
    
    expect(Rule19.fulfilled).toBe(expected);
});