import React, { useEffect, useState, useRef } from "react";

function HighlightedText({ highlight, rawText }) {
    const [highlightedText, setHighlightedText] = useState(rawText);
    const textRef = useRef(null);

    useEffect(() => {
        /**
         * The problem here is that we need to apply the highlight only to clearText, but we also need to process the htmlText
         * (for font sizes and families). To solve this, we need to separate the html tags from the rest of the text with the regex below.
         * 
         * See https://stackoverflow.com/a/62843574/22851578
         */
        const regexSimpleMarkup = (/(<[^>]+>)/g);
        const markupSplit = rawText.split(regexSimpleMarkup);
        let text = "";

        markupSplit.forEach((part) => {
            if (part.match(regexSimpleMarkup)) {
                text += part;
            } else {
                text += part.replace(highlight, '<span class="error-highlight">$&</span>');
            }
        })
        
        setHighlightedText(text);
    }, [rawText, highlight]);

    return (
        <div className="password-bg">
            <span style={{ fontFamily: "Monospace", fontSize: "28px" }} dangerouslySetInnerHTML={{ __html: highlightedText }} ref={textRef}>
            </span>
        </div>
    )
}


export default HighlightedText;