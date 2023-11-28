import { expect, test } from 'bun:test';
import { Rule4 } from '../../utils/rules/Rule4';

test.each([
    ['', false],
    ['a', false],
    ['@', true],
    ['a@', true],
    ['@a', true],
    ['@@@', true],
])('checkRule4(%s)', (s, expected) => {
    const rule = Rule4.getInstance();
    rule.text = s;
    rule.checkRule();

    expect(Rule4.fulfilled).toBe(expected);
});