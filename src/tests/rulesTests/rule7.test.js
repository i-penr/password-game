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
    const rule = Rule7.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();

    expect(Rule7.fulfilled).toBe(expected);
});