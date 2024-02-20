import { GenericRule } from '../GenericRule'

export class Rule20 extends GenericRule {
    static instance = new Rule20();
    static hasFireAlreadyStarted = false;

    constructor() {
        super();
        this.number = 20;
        this.desc = 'Oh no! Your password is on fire. Quick, put it out!';
    }

    componentDidMount() {
        if (!this.getClass().hasFireAlreadyStarted) {
            this.getClass().hasFireAlreadyStarted = true;
            this.textController.startFire();
        }
    }

    getClass() {
        return Rule20;
    }

    checkRule() {
        const text = this.textController.getClear();
        this.getClass().fulfilled = !text.includes('🔥') && this.getClass().hasFireAlreadyStarted;
    }
}