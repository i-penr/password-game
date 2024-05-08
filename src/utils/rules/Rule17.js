import { GenericRule } from '../GenericRule';
import { Paul } from '../Paul';

const paul = Paul.getInstance();

export class Rule17 extends GenericRule {
    static instance = new Rule17();

    constructor() {
        super();
        this.number = 17;
        this.desc = "🥚 ← This is my chicken Paul. He hasn't hatched yet, please put him in your password and keep him safe.";
    }

    getClass() {
        return Rule17;
    }

    checkRule() {
        const text = this.textController.getClear();

        this.getClass().fulfilled = this.getClass().fulfilled || text.includes(paul.state);

        this.checkIfPaulIsStillThere(text);
    }

    checkIfPaulIsStillThere(text) {
        if (!paul.isDead && this.getClass().fulfilled && !text.includes(paul.state)) {
            paul.killPaul("Paul has been slain");
        }
    }
}