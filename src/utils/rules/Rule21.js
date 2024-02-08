import { GenericRule } from '../GenericRule'
import { getAllRegexMatches } from '../functions';

export class Rule21 extends GenericRule {
    static instance = new Rule21(this.text);
    static strength;

    constructor(text) {
        super(text);
        this.number = 21;
        this.desc = 'Your password is not strong enough 🏋️‍♂️';
    }

    getClass() {
        return Rule21;
    }

    checkRule() {
        this.getClass().strength = getAllRegexMatches(this.text, /🏋️‍♂️/g).length;
        this.getClass().fulfilled = this.getClass().strength === 3;
    }

    render() {
        return (
            <div class="strength">
                <div class="bars">
                    <div class={`bar bar-red ${this.getClass().strength >= 0  ? "active" : ""}`}>
                    </div>
                    <div class={`bar bar-orange ${this.getClass().strength >= 1 ? "active" : ""}`}>
                    </div>
                    <div class={`bar bar-yellow ${this.getClass().strength >= 2 ? "active" : ""}`}>
                    </div>
                    <div class={`bar bar-green ${this.getClass().strength >= 3  ? "active" : ""}`}>
                    </div>
                </div>
            </div>
        )
    }
}