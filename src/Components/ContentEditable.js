import React, { useRef, useEffect } from "react";

function ContentEditable({ text, onChange }) {
    const contentRef = useRef(null);
    const cursorPosition = useRef(0);

    const restoreCursorPosition = () => {
        const selection = window.getSelection();
        const range = document.createRange();
        const textNode = contentRef.current.childNodes[0];
        if (textNode && cursorPosition.current <= textNode.length) {
            range.setStart(textNode, cursorPosition.current);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    const saveCursorPosition = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            cursorPosition.current = range.startOffset;
        }
    };

    const handleInput = (event) => {
        onChange(event.target.innerHTML);
        saveCursorPosition();
    };

    useEffect(() => {
        restoreCursorPosition();
    }, [text]);

    return (
        <div
            ref={contentRef}
            contentEditable
            onInput={handleInput}
            className="ProseMirror"
            dangerouslySetInnerHTML={{ __html: text }}
            translate="no"
            tabIndex={0}
            spellCheck={false}
        />
    );
}

export default ContentEditable;
