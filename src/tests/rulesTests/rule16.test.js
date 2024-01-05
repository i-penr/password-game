import { expect, test } from "bun:test";
import { Rule16 } from "../../utils/rules/Rule16";
import solutions from "../../utils/chess-solutions.json"

const rule = Rule16.getInstance();
const randomPuzzleNumber = Rule16.randomPuzzleNumber;

test.each([
    ["a", false],
    ["aaaaa", false],
    ["", false],
    [`aa${solutions[randomPuzzleNumber]}aa`, true],
    [`${solutions[randomPuzzleNumber]}`, true],
    [`${solutions[randomPuzzleNumber]} ${solutions[randomPuzzleNumber+1]}`, true]
])("checkRule16(%s)", (s, expected) => {
    rule.text = s;
    rule.checkRule();
    
    expect(Rule16.fulfilled).toBe(expected);
});