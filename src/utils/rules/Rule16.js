import { GenericRule } from '../GenericRule'
import solutions from '../chess-solutions.json';

export class Rule16 extends GenericRule {
    static instance = new Rule16(this.text);
    static randomPuzzleNumber = Math.floor(Math.random() * 192 + 1);
    static foundChessNotations;

    constructor(text) {
        super(text);
        this.number = 16;
        this.desc = 'Your password must include the best move in ';
    }

    renderEmbededDesc() {
        return (
            <a style={{ color: "#ff0000" }} target="_blank" href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">algebraic chess notation.</a>
        );
    }

    getClass() {
        return Rule16;
    }

    checkRule() {
        this.getClass().foundChessNotations = extractChessNotationFromString(this.text);

        this.getClass().fulfilled = this.text.includes(solutions[this.getClass().randomPuzzleNumber].move);
    }

    render() {
        return (
            <div className='chess-wrapper'>
                {
                    this.getClass().foundChessNotations && this.getClass().foundChessNotations.length > 0 && !this.fulfilled &&
                    <div className='guesses'>
                        {
                            this.getClass().foundChessNotations.map((elem, index) => (
                                <div key={index}>
                                    <img className='guess-icon' src='/error.svg' />
                                    {elem}
                                </div>

                            ))
                        }
                    </div>
                }
                <img src={`./chess/puzzle${this.getClass().randomPuzzleNumber}.svg`} className="chess-img" />
                <div className="move">{solutions[this.getClass().randomPuzzleNumber].color} to move</div>
            </div>
        )
    }
}

function extractChessNotationFromString(str) {
    const matches = str.match(/[NBRQK]?[a-h]?[1-8]?[x-]?[a-h][1-8](=[NBRQ])?[+#]?/g);
    if (matches) {
        return matches;
    }
    return [];
}