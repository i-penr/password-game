import { expect, test } from 'bun:test';
import { Rule2 } from '../../utils/rules/Rule2';

test.each([
    ['', false],
    ['a', false],
    ['aaaaa', false],
    ['1', true],
    ['1111111111', true],
    ['1234567', true],
    ['1231245hola312321312', true]
])('checkRule2(%s)', (s, expected) => {
    const rule = new Rule2(s);
    rule.checkRule();

    expect(rule.fulfilled).toBe(expected);
});