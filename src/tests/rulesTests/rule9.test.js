import { expect, test } from 'bun:test';
import { Rule9 } from '../../utils/rules/Rule9';

test.each([
    ['XXXV', true],
    ['aXXXVa', true],
    ['aXXXVIa', false],
    ['aIXXXVIa', false],
    ['IaIXXXVIaI', false],
    ['IaVVIIaI', true],
    ['VVII', true],
    ['aVaaaVIIa', true],
    ['IaVaaaVIIaI', true],
    ['', false],
    ['aa', false],
    ['aXa', false],
    ['XXXaV', false],
    ['IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII', false],
    ['VVIII', false],
    ['XXXXV', false],
    ['VaaaaVIII', false],
])('checkRule9(%s)', (s, expected) => {
    const rule = new Rule9(s);
    rule.checkRule();

    expect(rule.fulfilled).toBe(expected);
});