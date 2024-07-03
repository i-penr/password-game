import { GenericRule } from '../GenericRule';
import { Ruleset } from '../Ruleset';
import { Rule23 } from './Rule23';

export class Rule36 extends GenericRule {
    static instance = new Rule36();

    constructor() {
        super();
        this.number = 36;
        this.desc = 'Is this your final password?';
    }

    getClass() {
        return Rule36;
    }

    handleYesPress() {
        Rule36.fulfilled = true;
        makePasswordFinal();
    }

    checkRule() {
        return;
    }

    render() {
        return (
            <div className="final-password">
                <button onClick={() => { this.handleYesPress() }}>Yes</button>
                <button onClick={(e) => { e.target.style.display = "none" }}>No</button>
            </div>
        )
    }
}

function makePasswordFinal() {
    clearInterval(Rule23.feedingInterval);

    const rules = new Ruleset();

    rules.rules.forEach((rule) => { rule.getClass().fulfilled = true });

    rules.rules[0].textController.textUpdateFunction();
}