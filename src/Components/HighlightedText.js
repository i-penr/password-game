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
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawText;
        const spans = tempDiv.querySelectorAll('span') ?? rawText;
        let text = "";

        spans.forEach((part) => {
            text += part.innerText.replace(highlight, '<span class="error-highlight">$&</span>');
        });

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