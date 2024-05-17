import { GenericRule } from '../GenericRule'

export class Rule11 extends GenericRule {
    static instance = new Rule11();
    static isPending = true;
    static wordleAnswer = null;

    constructor() {
        super();
        this.number = 11;
        this.desc = 'Your password must include today\'s Wordle answer.';
    }

    static async getWordleAnswer() {
        const now = new Date();

        await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/wordle?date=${now.toISOString().substring(0, now.toISOString().indexOf("T"))}`)
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
        const text = this.textController.getClear();

        this.getClass().fulfilled = !this.getClass().isPending && text.includes(this.getClass().wordleAnswer);
    }
}