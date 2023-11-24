import { expect, test } from 'bun:test';
import { Rule7 } from '../../utils/rules/Rule7';

test.each([
    ['', false],
    ['a', false],
    ['xix', false],
    ['X', true],
    ['XXXXXXIX', true],
    ['sadXxa', true]
])('checkRule7(%s)', (s, expected) => {
    const rule = new Rule7(s);
    rule.checkRule();

    expect(rule.fulfilled).toBe(expected);
});