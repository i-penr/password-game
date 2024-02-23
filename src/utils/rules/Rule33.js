import { GenericRule } from '../GenericRule'

export class Rule33 extends GenericRule {
    static instance = new Rule33();

    constructor() {
        super();
        this.number = 33;
        this.desc = 'The length of your password must be a prime number.';
    }

    getClass() {
        return Rule33;
    }

    checkRule() {
        this.getClass().fulfilled = isPrime(this.textController.getTrueClearLength());
    }
}

function isPrime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    }
    
    return num > 1;
}