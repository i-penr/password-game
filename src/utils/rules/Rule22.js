import { GenericRule } from '../GenericRule';

const affirmations = ["iamloved", "iamworthy", "iamenough"];

export class Rule22 extends GenericRule {
    static instance = new Rule22(this.text);

    constructor(text) {
        super(text);
        this.number = 22;
        this.desc = 'Your password must contain one of the following affirmations:';
    }

    getClass() {
        return Rule22;
    }

    checkRule() {
        const text = this.textController.getClear();

        this.getClass().fulfilled =  affirmations.some((aff) => text.toLowerCase().replace(/\s/g, '').includes(aff));
    }

    render() {
        return (
            <div className='affirmation-list'>
                <ul>
                    <li>I am loved</li>
                    <li>I am worthy</li>
                    <li>I am enough</li>
                </ul>
            </div>
        )
    }
}

