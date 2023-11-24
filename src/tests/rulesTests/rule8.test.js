import { expect, test } from 'bun:test';
import { Rule8 } from '../../utils/rules/Rule8';

test.each([
    ['', false],
    ['a', false],
    ['pepsi', true],
    ['PPepsI', true],
    ['ShELl', true],
    ['starbucks', true],
    ['starfdsfasdfbucks', false],
])('checkRule8(%s)', (s, expected) => {
    const rule = new Rule8(s);
    rule.checkRule();

    expect(rule.fulfilled).toBe(expected);
});