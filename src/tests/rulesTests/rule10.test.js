import { expect, test } from 'bun:test';
import { Rule10 } from '../../utils/rules/Rule10';

const rule = Rule10.getInstance();

test.each([
    ['', false],
    ['a', false],
    [rule.state.randomCaptcha.substring(0, rule.state.randomCaptcha.indexOf(".")), true],
    ['a', false],
    ['a', false],
])('checkRule10(%s)', (s, expected) => {
    rule.text = s;
    rule.checkRule();

    expect(Rule10.fulfilled).toBe(expected);
});