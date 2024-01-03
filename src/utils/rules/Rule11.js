import { GenericRule } from '../GenericRule'

export class Rule11 extends GenericRule {
    static instance = new Rule11(this.text);
    static isPending = true;
    static wordleAnswer = null;

    constructor(text) {
        super();
        this.number = 11;
        this.desc = 'Your password must include today\'s Wordle answer.';
        this.text = text;
    }

    static async getWordleAnswer() {
        const now = new Date();

        await fetch(`http://localhost:3001/wordle?date=${now.toISOString().substring(0, now.toISOString().indexOf("T"))}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                Rule11.isPending = false;
                Rule11.wordleAnswer = data.solution;
            })
            .catch(err => {
                console.error(`There was an error in the wordle API ${err}`)
                Rule11.isPending = false;
            });
    }

    getClass() {
        return Rule11;
    }

    checkRule() {
        this.getClass().fulfilled = !this.getClass().isPending && this.getClass().getInstance().text.includes(this.getClass().wordleAnswer);
    }
}