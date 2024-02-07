import { GenericRule } from '../GenericRule'
import { TextController } from '../TextController';

export class Rule20 extends GenericRule {
    static instance = new Rule20(this.text);
    static hasFireAlreadyStarted = false;

    constructor(text) {
        super(text);
        this.number = 20;
        this.desc = 'Oh no! Your password is on fire. Quick, put it out!';
    }

    componentDidMount() {
        if (!this.getClass().hasFireAlreadyStarted) {
            this.getClass().hasFireAlreadyStarted = true;
            TextController.startFire();
        }
    }

    componentWillUnmount() {
        console.log("adios")
    }

    getClass() {
        return Rule20;
    }

    checkRule() {
        this.getClass().fulfilled = !this.text.includes('🔥');
    }
}