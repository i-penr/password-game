import { GenericRule } from '../GenericRule'

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
        this.getClass().fulfilled = this.text.length >= 5;
    }

    render() {
        <div data-v-c15cedce="" data-v-520e375b="" class="strength">
            <div data-v-c15cedce="" class="bars">
                <div data-v-c15cedce="" class="bar bar-red active">
                </div>
                <div data-v-c15cedce="" class="bar bar-orange">
                </div>
                <div data-v-c15cedce="" class="bar bar-yellow">
                </div>
                <div data-v-c15cedce="" class="bar bar-green">
                </div>
            </div>
        </div>
    }
}