/* 
TODO: FIX THIS TEST

import { expect, test } from "bun:test";
import { Rule30 } from "../../utils/rules/Rule30";

test.each([
    ['<p>d<span style="font-size: 25px">5</span>sa<span style="font-size: 64px">8</span>da<span style="font-size: 81px">9</span></p>', true],
    ['<p>d<span style="font-size: 4px">5</span>sa<span style="font-size: 64px">8</span>da<span style="font-size: 81px">9</span></p>', false],
    ["aaaaa", true],
    ['<p>d<span style="font-size: 25px">55a5dsa5</p>sadad', true],
    ["", true],
    ['asdfdasf<span style="font-size: 25px">5</span><span style="font-size: 16px">4</span><span style="font-size: 9px">3</span>', true],
    ['<span style="font-size: 0px">0</span>', true],
    ['<span style="font-family: Wingdings; font-size: 0px">0</span>', true],
    ['asdf323dasf<span style="font-size: 25px">5</span><span style="font-size: 16px">4</span><span style="font-size: 9px">3</span>', false],
])("checkRule30(%s)", (s, expected) => {
    const rule = Rule30.getInstance();
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule30.fulfilled).toBe(expected);
}); */