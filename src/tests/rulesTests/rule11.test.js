import { expect, test } from "bun:test";
import { Rule11 } from "../../utils/rules/Rule11";

// Suppose that the request is good if the wordleAnswer fetched has a length of 5.
test("checkRule11()", async () => {
    await Rule11.getWordleAnswer();
    
    expect(Rule11.wordleAnswer).toHaveLength(5);
}, 1000);