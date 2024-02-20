import { expect, test } from 'bun:test';
import { Rule3 } from '../../utils/rules/Rule3';

test.each([
    ['', false],
    ['a', false],
    ['aaaaaaa', false],
    ['12345aaa', false],
    ['aaAAaAa', true],
    ['A', true],
    ['AAAAAAAAAA', true],
])('checkRule3(%s)', (s, expected) => {
    const rule = Rule3.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();

    expect(Rule3.fulfilled).toBe(expected);
});