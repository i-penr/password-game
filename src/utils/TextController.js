import sanitizeHtml from 'sanitize-html';

export class TextController {
    static instance = new TextController();
    rawText;
    textUpdateFunction;
    htmlText;
    clearText;

    constructor() {
        this.rawText = "";
        this.htmlText = "";
        this.clearText = "";
        this.textUpdateFunction = null;
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
    }

    setTextUpdateFunction(textUpdateFunction) {
        this.textUpdateFunction = textUpdateFunction;
    }

    updateText(text) {
        this.rawText = text;
        this.clearText = decodeHTML(sanitizeHtml(this.rawText, { allowedTags: [] }));
        this.htmlText = sanitizeHtml(this.rawText, { allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'br', 'div'], allowedAttributes: { a: ['href'] }});
        if (this.textUpdateFunction) this.textUpdateFunction();
    }

    /*
     *  This fire simulates the real effect. Of course, it probably does not behave the same way, but it is close enough
     *  and it serves its purpose.
     */ 
    startFire() {
        const fireStartingIndex = Math.ceil(Math.random() * this.clearText.length);
        let text = stringReplaceAtWithFire(this.clearText, fireStartingIndex);
        this.updateText(text);
        let prev = fireStartingIndex-1;
        let next = fireStartingIndex+3;
        let isNextFinished = false; 

        const fireInterval = setInterval(() => {
            text = this.clearText;

            prev = text.indexOf('🔥');

            if (prev > 0) {
                text = stringReplaceAtWithFire(text, prev-1);
            }

            next = text.lastIndexOf('🔥');
            isNextFinished = next === text.length-2;

            if (next <= text.length-1 && !isNextFinished) {
                // prev is still going? Then next +3, 2 (fire emoji size) + 1 (fire emoji inserted by prev)
                prev === -1 ? next+=1 : next+=2;

                text = stringReplaceAtWithFire(text, next);
            }

            this.updateText(text);

            if ((prev === 0 && isNextFinished) || stringHasNoFire(text)) {
                console.log("Burn finished!")
                clearInterval(fireInterval);
                return;
            }
        }, 1000);
    }

    getClear() {
        return this.clearText;
    }

    getHtml() {
        return this.htmlText;
    }
    
    // Emojis take up two characters. When showing the length, it would be nice to count them as only one.
    getTrueClearLength() {
        const rawLength = this.clearText.length;
        const emojisInText = this.clearText.match(/\p{Emoji}/gu);
        const numOfEmojisInText = emojisInText ? emojisInText.length : 0;

        return rawLength - numOfEmojisInText;
    }
}

function stringReplaceAtWithFire(s, index) {
    return s.slice(0, index) + '🔥' + s.slice(index + 1);
}

function stringHasNoFire(s) {
    return !s.includes('🔥');
}

// We don't need the escaped chars in clearText
function decodeHTML(s) {
    return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}