import { GenericRule } from '../GenericRule'

export class Rule35 extends GenericRule {
    static instance = new Rule35();

    constructor() {
        super();
        this.number = 35;
        this.desc = 'Your password must include the current time.';
    }

    getClass() {
        return Rule35;
    }

    checkRule() {
        const date = new Date();
        const hour24 = date.getHours() % 12;
        const hour12 = (hour24 ? hour24 : 12).toString().padStart(2, '0')
        const minute = date.getMinutes().toString().padStart(2, '0');

        console.log(`${hour24}:${minute}`)

        this.getClass().fulfilled = this.textController.getClear().includes(`${hour12}:${minute}`);
    }
}