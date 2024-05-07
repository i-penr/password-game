import React from "react";

function HighlightedText({ highlightedText }) {
    return (
        <div className="password-bg" dangerouslySetInnerHTML={{ __html: highlightedText }}></div>
    )
}


export default HighlightedText;