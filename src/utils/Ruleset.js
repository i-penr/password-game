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
import { Rule12 } from './rules/Rule12';
import { Rule13 } from './rules/Rule13';
import { Rule14 } from './rules/Rule14';
import { Rule15 } from './rules/Rule15';
import { Rule16 } from './rules/Rule16';
import { Rule17 } from './rules/Rule17';
import { Rule18 } from './rules/Rule18';
import { Rule19 } from './rules/Rule19';
import { Rule20 } from './rules/Rule20';
import { Rule21 } from './rules/Rule21';
import { Rule22 } from './rules/Rule22';
import { Rule23 } from './rules/Rule23';
import { Rule24 } from './rules/Rule24';
import { Rule25 } from './rules/Rule25';
import { Rule26 } from './rules/Rule26';
import { Rule27 } from './rules/Rule27';
import { Rule28 } from './rules/Rule28';
import { Rule29 } from './rules/Rule29';
import { Rule30 } from './rules/Rule30';
import { Rule31 } from './rules/Rule31';
import { Rule32 } from './rules/Rule32';
import { Rule33 } from './rules/Rule33';
import { Rule34 } from './rules/Rule34';
import { Rule35 } from './rules/Rule35';

export class Ruleset {
    constructor(rules) {
        if (rules) {
            this.rules = rules;
        } else {
            this.rules = [
                Rule1.getInstance(), Rule2.getInstance(), Rule3.getInstance(), Rule4.getInstance(), Rule5.getInstance(), 
                Rule6.getInstance(), Rule7.getInstance(), Rule8.getInstance(), Rule9.getInstance(), Rule10.getInstance(), 
                Rule11.getInstance(), Rule12.getInstance(), Rule13.getInstance(), Rule14.getInstance(), Rule15.getInstance(),
                Rule16.getInstance(), Rule17.getInstance(), Rule18.getInstance(), Rule19.getInstance(), Rule20.getInstance(),
                Rule21.getInstance(), Rule22.getInstance(), Rule23.getInstance(), Rule24.getInstance(), Rule25.getInstance(),
                Rule26.getInstance(), Rule27.getInstance(), Rule28.getInstance(), Rule29.getInstance(), Rule30.getInstance(),
                Rule31.getInstance(), Rule32.getInstance(), Rule33.getInstance(), Rule34.getInstance(), Rule35.getInstance()
            ];
        }
    }

    setText(newText) {
        this.rules.forEach((rule) => { rule.text = newText });
    }

    addRule(newRule) {
        this.rules.unshift(newRule);
    }

    removeRule(removedRule) {
        this.rules = this.rules.filter((rule) => rule.number !== removedRule.number);
    }

    async checkAllRules() {
        try {
            if (this.rules.length === 0) {
                return true;
            }

            for (const rule of this.rules) {
                await rule.checkRule();
            }

            return this.rules.every((rule) => rule.getClass().fulfilled);
        } catch (err) {
            console.error(err);

            return false;
        }
    }

    // Order: non fulfilled first, highest rule first
    sort() {
        this.rules.sort((a, b) => {
            if (a.getClass().fulfilled === b.getClass().fulfilled) {
                return a.number < b.number ? 1 : -1;
            }

            return a.getClass().fulfilled > b.getClass().fulfilled ? 1 : -1;
        });
    }

    includesRuleNum(num) {
        return this.rules.some((rule) => rule.number >= num);
    }
}