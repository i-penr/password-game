export function getAllRegexMatches(text, regex) {
    const matches = text.match(regex);
    if (matches) {
        return matches;
    }
    return [];
}

export function getFormattedStringsInText(format, text) {
    const formatClose = format.split(' ')[0];
    let zones = text.split(new RegExp(`<[^/]*?${format}.*?>`)).slice(1).filter((elem) => elem.includes(`</${formatClose}>`));
    let formated = [];

    zones.forEach((rawArea) => {
        formated.push(rawArea.split(`</${formatClose}>`)[0]); // left part of </format>
    });

    return formated;
}

export function getSubstringsWithFont(font, text) {
    return getFormattedStringsInText(`span style="[^"]*font-family: ${font}.*?"`, text);
}

export function getSpanListFromHtmlText(htmlText) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    return tempDiv.querySelectorAll('span');
}

export function extractAndMergeTextWithFontSizes(content) {
    const textWithFontSizes = {};

    function traverse(node) {
        if (node.type === "text") {
            if (!node.text.length) return;

            let fontSize = "28";

            if (node.marks) {
                node.marks.forEach(mark => {
                    if (mark.type === "textStyle" && mark.attrs.fontSize) {
                        fontSize = mark.attrs.fontSize.replace("px", "");
                    }
                });
            }

            if (!textWithFontSizes[fontSize]) {
                textWithFontSizes[fontSize] = '';
            }

            // Ensure node.text is a string
            const textToAdd = typeof node.text === 'string' ? node.text : '';

            textWithFontSizes[fontSize] += textToAdd;
        } else if (node.content) {
            node.content.forEach(traverse);
        }
    }

    traverse(content);

    return textWithFontSizes;
}


/**
 * These two following funcions are use for highlighting.
 * The highlighted string is generated from each rules, as a dynamic behaviour is necessary.
 * 
 * There is an "antihighlight" defined, which is a html tag name that nullifies the highlight.
 * For example, if a vowel is bolded in rule 19, the condition is fulfilled for that letter, so it souln't be highlighted.
 * This is only necessary in some rules (19, 29, 30 and 31).
 * 
 * Rule 30 and 31 uses a different function inside their own classes, as the fullfillment of a letter is determined by the 
 * value of the letter itself.
 * In rule 30's case, a number 3 is only fullfilled if its size is 9, but a number 2 only works with the size 4.
 */
export function generateHighlightString(text, highlight, antihighlight = '') {
    /**
     * The problem here is that we need to apply the highlight only to clearText, but we also need to process the htmlText
     * (for font sizes and families). To solve this, we need to separate the html tags from the rest of the text with the regex below.
     * 
     * See https://stackoverflow.com/a/62843574/22851578
     */
    const regexSimpleMarkup = /(<[^>]+>)/g;
    const markupSplit = text.split(regexSimpleMarkup).filter((elem) => elem.length > 0);
    const antihighlightCloseTag = antihighlight.split(' ')[0];
    let dontHighlight = false;
    let resultText = "";

    markupSplit.forEach((part) => {
        const matchesAntiHighlight = new RegExp(`<${antihighlight}>`).test(part);

        if (matchesAntiHighlight || (dontHighlight && part === `</${antihighlightCloseTag}>`)) {
            dontHighlight = !dontHighlight;
        }

        if ((part.startsWith("<") && part.endsWith(">")) || dontHighlight) {
            resultText += part;
        } else {
            resultText += part.replace(highlight, '<span class="error-highlight">$&</span>');
        }
    });

    return resultText;
}