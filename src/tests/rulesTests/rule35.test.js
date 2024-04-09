import { expect, test } from "bun:test";
import { Rule35 } from "../../utils/rules/Rule35";

const date = new Date();
const hour24 = date.getHours() % 12;
const hour12 = (hour24 ? hour24 : 12).toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');

const formatedDate = `${hour12}:${minutes}`

test.each([
    ["a", false],
    [`${formatedDate}`, true],
    [`aaa${formatedDate}aaaa`, true],
    [`aaa00:01aaaa`, false],
    [`aaa13:01aaaa`, false],
])("checkRule35(%s)", (s, expected) => {
    const rule = Rule35.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();

    expect(Rule35.fulfilled).toBe(expected);
});