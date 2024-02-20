import { expect, test } from "bun:test";
import { Rule16 } from "../../utils/rules/Rule16";
import solutions from "../../utils/chess-solutions.json"

const rule = Rule16.getInstance();
const randomPuzzleNumber = Rule16.randomPuzzleNumber;

test.each([
    ["a", false],
    ["aaaaa", false],
    ["", false],
    [`aa${solutions[randomPuzzleNumber].move}aa`, true],
    [`${solutions[randomPuzzleNumber].move}`, true],
    [`${solutions[randomPuzzleNumber].move} ${solutions[randomPuzzleNumber+1].move}`, true]
])("checkRule16(%s)", (s, expected) => {
    rule.textController.updateText(s);
    rule.checkRule();
    
    expect(Rule16.fulfilled).toBe(expected);
});