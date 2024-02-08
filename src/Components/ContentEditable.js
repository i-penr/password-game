import React, { useState } from "react";

function ContentEditable({ text, onChange }) {
    const handleInput = (event) => {
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div
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