import { GenericRule } from '../GenericRule'

export class Rule8 extends GenericRule {
    static instance = new Rule8(this.text);

    constructor(text) {
        super(text);
        this.number = 8;
        this.desc = "Your password must include one of our sponsors:";
    }

    getClass() {
        return Rule8;
    }

    checkRule() {
        const lowercase = this.text.toLowerCase();
        this.getClass().fulfilled = lowercase.includes('pepsi') || lowercase.includes('starbucks') || lowercase.includes('shell');
    }

    render() {
        return (
            <div className='sponsors'>
                <img className='sponsor pepsi' src='./sponsors/pepsi.svg' alt='pepsi'/>
                <img className='sponsor starbucks' src='./sponsors/starbucks.svg' alt='starbucks'/>
                <img className='sponsor shell' src='./sponsors/shell.svg' alt='shell'/>
            </div>
        )
    }
}