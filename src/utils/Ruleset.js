import { Rule1 } from './rules/Rule1';
import { Rule2 } from './rules/Rule2';
import { Rule3 } from './rules/Rule3';
import { Rule4 } from './rules/Rule4';
import { Rule5 } from './rules/Rule5';
import { Rule6 } from './rules/Rule6';
import { Rule7 } from './rules/Rule7';
import { Rule8 } from './rules/Rule8';
import { Rule9 } from './rules/Rule9';
import { Rule10 } from './rules/Rule10';
import { Rule11 } from './rules/Rule11';

export class Ruleset {
    constructor(text, rules) {
        if (rules) {
            this.rules = rules;
        } else {
            this.rules = [
                Rule1.getInstance(), Rule2.getInstance(), Rule3.getInstance(),
                Rule4.getInstance(), Rule5.getInstance(), Rule6.getInstance(),
                Rule7.getInstance(), Rule8.getInstance(), Rule9.getInstance(), 
                Rule10.getInstance(), Rule11.getInstance()
            ];
        }
    }

    setText(newText) {
        this.rules.forEach((rule) => { rule.text = newText });
    }

    addRule(newRule) {
        this.rules.push(newRule);
    }

    removeRule(removedRule) {
        this.rules = this.rules.filter((rule) => rule.number !== removedRule.number);
    }

    checkAllRules() {
        this.rules.forEach((rule) => rule.checkRule())
        return this.rules.every((rule) => rule.fulfilled);
    }

    // Order: non fulfilled first, highest rule first
    sort() {
        this.rules.sort((a, b) => {
            if (a.fulfilled === b.fulfilled) {
                return a.number < b.number;
            } 
                
            return a.fulfilled > b.fulfilled;
        });
    }
}