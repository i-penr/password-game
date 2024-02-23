import { TextController } from "./TextController";

const tc = TextController.getInstance();

export class Paul {
    static instance = new Paul();

    constructor () {
        this.state = '🥚';
        this.isDead = false;
        this.deathReason = '';
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
    }

    killPaul(reason) {
        this.isDead = true;
        this.changeState('🪦');
        this.deathReason = reason;
    }

    changeState(emoji) {
        const text = tc.rawText;
        const newText = text.replace(this.state, emoji);
        
        this.state = emoji;
        tc.updateText(newText);
    }
}