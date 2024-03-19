import { useEditor, EditorContent, markInputRule, Mark } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import HighlightedText from "./HighlightedText";
import { TextController } from "../utils/TextController";
import { Paul } from "../utils/Paul";

export default function Tiptap({ html, onChange, displayedRules, highlight }) {
    const tc = TextController.getInstance();

    const editor = useEditor({
        extensions: [StarterKit.configure({
            blockquote: false,
            code: false,
            codeBlock: false,
            heading: false,
            strike: false,
            bulletList: false,
        }),
        TextStyle.configure(),
        FontFamily.configure({
            types: ['textStyle']
        })],
        content: html,
        editorProps: {
            transformPastedText: (pastedText, plain, view) => {
                const paul = Paul.getInstance();

                // Allowing pasting more than one egg will be cheating (you can just paste a bunch of eggs and Paul does not die)
                if (paul && view.dom.innerHTML.includes(paul.state) && pastedText.includes(paul.state)) return '';

                return pastedText;
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        }
    });

    return (
        <>
            <div className='password-box'>
                <div className='password-label'>
                    Please choose a password
                </div>
                <div className='password-box-inner' spellCheck="false">
                    <HighlightedText rawText={tc.getHtml()} highlight={highlight} />
                    <EditorContent editor={editor} />
                    <div className='password-length show-password-length' style={{ opacity: tc.getTrueClearLength() === 0 ? 0 : 1 }} >
                        {tc.getTrueClearLength()}
                    </div>
                </div>
            </div>
            <Toolbar editor={editor} displayedRules={displayedRules} />
        </>
    )
}