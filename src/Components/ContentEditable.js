import React, { useRef, useEffect } from "react";

function ContentEditable({ text, onChange }) {
    const contentRef = useRef(null);
    const cursorPosition = useRef(0);

    const restoreCursorPosition = () => {
        const target = document.createTextNode('');
        contentRef.current.appendChild(target);
        const isTargetFocused = document.activeElement === contentRef.current;
    
        if (target !== null && target.nodeValue !== null && isTargetFocused) {
            const sel = window.getSelection();
    
            if (sel !== null) {
                const range = document.createRange();
                const position = Math.min(cursorPosition.current, target.nodeValue.length);
                range.setStart(target, position);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
    
            if (contentRef.current instanceof HTMLElement) contentRef.current.focus();
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
        console.log(text)
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
