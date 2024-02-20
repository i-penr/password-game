import { GenericRule } from '../GenericRule';
import { Moon } from "lunarphase-js";

export class Rule13 extends GenericRule {
    static instance = new Rule13();

    constructor() {
        super();
        this.number = 13;
        this.desc = 'Your password must include the current phase of the moon as an emoji.';
    }

    getClass() {
        return Rule13;
    }

    checkRule() {
        const text = this.textController.getClear();
        const phase = Moon.lunarPhaseEmoji();

        this.getClass().fulfilled = text.includes(phase);
    }
}