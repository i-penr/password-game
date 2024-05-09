import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import HighlightedText from "./HighlightedText";
import { TextController } from "../utils/TextController";
import { Paul } from "../utils/Paul";
import FontSize from "tiptap-extension-font-size";
import React, { useEffect, useMemo, useState } from "react";
import Paragraph from "@tiptap/extension-paragraph";

// This component is basically the same as Tiptap.jsx. I know, its bad

export default function FinalEditor() {
    const [arePasswordsEqual, setArePasswordsEqual] = useState(false);
    const tc = TextController.getInstance();
    const finalTc = useMemo(() => new TextController(), []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                blockquote: false,
                code: false,
                codeBlock: false,
                heading: false,
                strike: false,
                bulletList: false,
                orderedList: false,
                horizontalRule: false,
                paragraph: false,
            }),
            Paragraph.extend({
                onCreate({ editor }) {
                    editor.chain().focus().selectAll().setFontFamily('Monospace').setFontSize('28px').run();
                },
            }),
            TextStyle.configure({
                types: ['paragraph']
            }),
            FontFamily.configure({
                types: ['textStyle']
            }),
            FontSize.configure({
                types: ['textStyle']
            })],
        content: finalTc.getHtml(),
        editorProps: {
            transformPasted: (pastedText, view) => {
                const paul = Paul.getInstance();

                // Allowing pasting more than one egg will be cheating (you can just paste a bunch of eggs and Paul does not die)
                if (paul && view.dom.innerHTML.includes(paul.state) && pastedText.content.toString().includes(paul.state)) return '';

                return pastedText;
            },
            transformPastedHTML: (html) => {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = html;
            
                // Apply font family and font size to all elements inside the wrapper
                Array.from(wrapper.querySelectorAll('*')).forEach(element => {
                    if (!element.style.fontFamily) element.style.fontFamily = 'Monospace';
                    if (!element.style.fontSize) element.style.fontSize = '28px';
                });
            
                // Wrap the entire pasted content in a span with the desired font family and font size
                const styledContent = `<span style="font-family: Monospace; font-size: 28px;">${wrapper.innerHTML}</span>`;
                
                return styledContent;
            }
            
        },
        onUpdate({ editor }) {
            finalTc.updateText(editor.getHTML());
            finalTc.editor = editor;
        },
    });

    useEffect(() => {
        setArePasswordsEqual(finalTc.htmlText === tc.htmlText);
    }, [tc.htmlText, finalTc.htmlText])

    useEffect(() => {
        if (arePasswordsEqual && editor) {
            const editorElement = document.getElementsByClassName('tiptap ProseMirror')[1];
            editorElement.classList.add('password-final');
            editor.setEditable(false);
        }
    }, [arePasswordsEqual, editor]);

    return (
        <>
            <div className='password-box'>
                <div className='password-label'>
                    Please re-type your password
                </div>
                <div className='password-box-inner' spellCheck="false">
                    <HighlightedText highlightedText={'./*'} />
                    <EditorContent editor={editor} />
                    <div className='password-length show-password-length' style={{ opacity: finalTc.getTrueClearLength() === 0 ? 0 : 1 }} >
                        {finalTc.getTrueClearLength()}
                    </div>
                </div>
            </div>
            { !arePasswordsEqual && <Toolbar editor={editor} /> }
            { !arePasswordsEqual && <div className="error-match">Your passwords must match.</div> }
            { arePasswordsEqual && <div className="end-screen"><strong>Congratulations!</strong> You have sucessfully chosen a password in {tc.getTrueClearLength()} characters. </div> }
        </>
    )
}