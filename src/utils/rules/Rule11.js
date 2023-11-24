import { GenericRule } from '../GenericRule'

export class Rule11 extends GenericRule {
    static instance = new Rule11(this.text);
    static isPending = true;
    static wordleAnswer = null;

    constructor(text) {
        super(text);
        this.number = 11;
        this.desc = 'Your password must include today\'s Wordle answer.';
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
    }

    componentDidMount() {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const abortCont = new AbortController();

        fetch(`http://localhost:3001/api/data?date=${year}-${month}-${day}`, {
        })
            .then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                this.getClass().isPending = false;
                this.getClass().wordleAnswer = data.solution;
                this.getClass().checkRule();
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    this.getClass().isPending = false;
                }
            });
        return () => abortCont.abort();

    }

    getClass() {
        return Rule11;
    }

    checkRule() {
        console.log(this.getClass().wordleAnswer)
        this.fulfilled = !this.getClass().isPending && this.getClass().getInstance().text.includes(this.getClass().wordleAnswer);
    }
}