import sanitizeHtml from 'sanitize-html';

export class TextController {
    static rawText;
    static textUpdateFunction;
    static htmlText;
    static clearText;

    constructor(textUpdateFunction) {
        if (textUpdateFunction) {
            TextController.textUpdateFunction = textUpdateFunction;
        }
    }

    static updateText(text) {
        TextController.rawText = text;
        TextController.clearText = decodeHTML(sanitizeHtml(TextController.rawText, { allowedTags: [] }));
        TextController.htmlText = sanitizeHtml(TextController.rawText, { allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'br', 'div'], allowedAttributes: { a: ['href'] }});
        TextController.textUpdateFunction();
    }

    /*
     *  This fire simulates the real effect. Of course, it probably does not behave the same way, but it is close enough
     *  and it serves its purpose.
     */ 
    static startFire() {
        const fireStartingIndex = Math.ceil(Math.random() * TextController.clearText.length);
        let text = stringReplaceAtWithFire(TextController.clearText, fireStartingIndex);
        TextController.updateText(text);
        let prev = fireStartingIndex-1;
        let next = fireStartingIndex+3;
        let isNextFinished = false; 

        const fireInterval = setInterval(() => {
            new TextController();
            text = TextController.clearText;

            if ((prev === 0 && isNextFinished) || stringHasNoFire(text)) {
                console.log("Burn finished!")
                clearInterval(fireInterval);
                return;
            }

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

            TextController.updateText(text);
        }, 1000);
    }

    getClear() {
        return TextController.clearText;
    }

    getHtml() {
        return TextController.htmlText;
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