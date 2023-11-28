import { expect, test } from "bun:test";
import { Rule13 } from "../../utils/rules/Rule13";

test.each([
    ["a", false],
    ["aaaaa", false],
    ["", false],
    ["aa🌑🌒🌓🌔🌕🌖🌗🌘aaaa", true]
])("checkRule13(%s)", (s, expected) => {
    const rule = Rule13.getInstance();
    rule.text = s;
    rule.checkRule();
    
    expect(Rule13.fulfilled).toBe(expected);
});