import { expect, test } from 'bun:test';
import { Rule6 } from '../../utils/rules/Rule6';

test.each([
    ['', false],
    ['a', false],
    ['dec', false],
    ['december', true],
    ['dsaasdecember32131sdas', true],
    ['December', true],
    ['DECEMBER', true],
    ['dec321ember', false]
])('checkRule6(%s)', (s, expected) => {
    const rule = Rule6.getInstance();
    rule.text = s;
    rule.checkRule();

    expect(Rule6.fulfilled).toBe(expected);
});