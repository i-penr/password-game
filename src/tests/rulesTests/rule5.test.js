import { expect, test } from 'bun:test';
import { Rule5 } from '../../utils/rules/Rule5';

test.each([
    ['', false],
    ['a', false],
    ['1', false],
    ['123245151', false],
    ['55555', true],
    ['555555', false],
    ['5555500000000000000000', true]
])('checkRule5(%s)', (s, expected) => {
    const rule = new Rule5(s);
    rule.checkRule();

    expect(rule.fulfilled).toBe(expected);
});