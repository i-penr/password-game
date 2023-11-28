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
    const rule = Rule8.getInstance();
    rule.text = s;
    rule.checkRule();

    expect(Rule8.fulfilled).toBe(expected);
});