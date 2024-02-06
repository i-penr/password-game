import sanitizeHtml from 'sanitize-html';

export class TextController {
    static rawText;
    static hasFireAlreadyBeenTriggered = false;

    constructor(text, textUpdateFunction) {
        TextController.rawText = text;
        this.textUpdateFunction = textUpdateFunction;
    }

    updateText(text) {
        TextController.rawText = text;
        this.clearText = sanitizeHtml(TextController.rawText, { allowedTags: [] });
        this.htmlText = sanitizeHtml(TextController.rawText, { allowedTags: ['b', 'br'] });
        this.hasFireAlreadyBeenTriggered = false;

        this.textUpdateFunction();
    }

    spreadFire() {
        const fireStartingIndex = Math.ceil(Math.random() * TextController.rawText.length);
        let text = stringReplaceAtWithFire(TextController.rawText, fireStartingIndex);
        this.updateText(text);
        let prev = fireStartingIndex-1;
        let next = fireStartingIndex+3;
        let isNextFinished = false; 

        const fireInterval = setInterval(() => {
            if (prev >= 0) {
                text = stringReplaceAtWithFire(text, prev);
                prev--;
            }

            // The right spread is a little bit special, because the size keeps changing with the left size growing at the same time
            // (the fire emoji takes up two spaces). That is why, when we reach the end in the right part, we don't want to keep going,
            // even if the string keeps growing. For that, we set the flag isNextFinished.

            // If it is already true, it will always be true
            isNextFinished =  isNextFinished || next >= text.length;

            if (next <= text.length-1 && !isNextFinished) {
                text = stringReplaceAtWithFire(text, next);
                prev === -1 ? next+=2 : next+=3;
            }

            this.updateText(text);

            if ((prev === -1 && isNextFinished) || stringHasNoFire(text)) {
                clearInterval(fireInterval);
            }

        }, 1000);
    }

    getClear() {
        return this.clearText;
    }

    getHtml() {
        return this.htmlText;
    }
}

function stringReplaceAtWithFire(s, index) {
    return s.slice(0, index) + '🔥' + s.slice(index + 1);
}

function stringHasNoFire(s) {
    return !s.includes('🔥');
}