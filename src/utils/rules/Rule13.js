import { GenericRule } from '../GenericRule';
import { Moon } from "lunarphase-js";

export class Rule13 extends GenericRule {
    static instance = new Rule13(this.text);

    constructor(text) {
        super(text);
        this.number = 13;
        this.desc = 'Your password must include the current phase of the moon as an emoji.';
    }

    getClass() {
        return Rule13;
    }

    checkRule() {
        const phase = Moon.lunarPhaseEmoji();

        this.getClass().fulfilled = this.text.includes(phase);
    }
}