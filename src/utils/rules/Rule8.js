import { GenericRule } from '../GenericRule'

export class Rule8 extends GenericRule {
    constructor(text) {
        super(text);
        this.number = 8;
        this.desc = "Your password must include one of our sponsors:";
    }

    checkRule() {
        const lowercase = this.text.toLowerCase();
        this.fulfilled = lowercase.includes('pepsi') || lowercase.includes('starbucks') || lowercase.includes('shell');
    }

    addAdditionalHtml() {
        return (
            <div className='sponsors'>
                <img className='sponsor pepsi' src='./sponsors/pepsi.svg' alt='pepsi'/>
                <img className='sponsor starbucks' src='./sponsors/starbucks.svg' alt='starbucks'/>
                <img className='sponsor shell' src='./sponsors/shell.svg' alt='shell'/>
            </div>
        )
    }
}