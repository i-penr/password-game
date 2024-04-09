export function Toolbar({ editor, displayedRules }) {
    if (!editor) return null;

    function handleFontChange(font) {
        editor.chain().focus().setFontFamily(font).run();
    }

    function handleSizeChange(size) {
        editor.chain().focus().setFontSize(`${size}px`).run();
    }

    return (
        <div className='toolbar' style={{ display: displayedRules.includesRuleNum(19) ? 'flex' : 'none' }} >
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
                Bold
            </button>
            {
                displayedRules.includesRuleNum(26) &&
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
                    Italic
                </button>
            }
            {
                displayedRules.includesRuleNum(30) &&
                <select value={editor.getAttributes('textStyle').fontSize?.replace('px', '') ?? 28} onChange={(e) => handleSizeChange(e.target.value)}>
                    <option value={0}>0px</option>
                    <option value={1}>1px</option>
                    <option value={4}>4px</option>
                    <option value={9}>9px</option>
                    <option value={12}>12px</option>
                    <option value={16}>16px</option>
                    <option value={25}>25px</option>
                    <option value={28}>28px</option>
                    <option value={32}>32px</option>
                    <option value={36}>36px</option>
                    <option value={42}>42px</option>
                    <option value={49}>49px</option>
                    <option value={64}>64px</option>
                    <option value={81}>81px</option>
                </select>
            }
            {
                displayedRules.includesRuleNum(27) &&
                <select value={editor.getAttributes('textStyle').fontFamily ?? 'Monospace'} onChange={(e) => handleFontChange(e.target.value)}>
                    <option value="Monospace">Monospace</option>
                    <option value="Comic Sans">Comic Sans</option>
                    <option value="Wingdings">Wingdings</option>
                    {displayedRules.includesRuleNum(29) && <option value="Times New Roman">Times New Roman</option>}
                </select>
            }
        </div>
    )
}