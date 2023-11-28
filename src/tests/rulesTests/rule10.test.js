import { expect, test } from 'bun:test';
import { Rule10 } from '../../utils/rules/Rule10';

// there is not much to test here tbh
test.each([
    ['', false],
    ['a', false],
])('checkRule10(%s)', (s, expected) => {
    const rule = Rule10.getInstance();
    rule.text = s;
    rule.checkRule();

    expect(Rule10.fulfilled).toBe(expected);
});