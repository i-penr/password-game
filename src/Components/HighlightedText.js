import React, { useEffect, useState } from "react";

function HighlightedText({ highlight, rawText }) {
    const [highlightedText, setHighlightedText] = useState(rawText);

    useEffect(() => {
        const text = rawText;
        setHighlightedText(text.replace(highlight, (match) => `<span class="error-highlight">${match}</span>`));
    }, [rawText, highlight]);

    return (
        <div className="password-bg">
            <p>
                <span style={{ fontFamily: "Monospace", fontSize: "28px" }} dangerouslySetInnerHTML={{ __html: highlightedText }}>
                </span>
            </p>
        </div>
    )
}

export default HighlightedText;