import { GenericRule } from '../GenericRule'
import { getAllRegexMatches } from '../functions';

export class Rule21 extends GenericRule {
    static instance = new Rule21(this.text);

    constructor(text) {
        super(text);
        this.number = 21;
        this.desc = 'Your password is not strong enough 🏋️‍♂️';
    }

    getClass() {
        return Rule21;
    }

    checkRule() {    
        this.getClass().fulfilled = getAllRegexMatches(this.text, /🏋️‍♂️/g).length === 3;
    }

    render() {
        <div class="strength">
            <div class="bars">
                <div class="bar bar-red active">
                </div>
                <div class="bar bar-orange">
                </div>
                <div class="bar bar-yellow">
                </div>
                <div class="bar bar-green">
                </div>
            </div>
        </div>
    }
}