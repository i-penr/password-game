import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import HighlightedText from "./HighlightedText";
import { TextController } from "../utils/TextController";
import { Paul } from "../utils/Paul";
import FontSize from "tiptap-extension-font-size";
import React, { useEffect } from "react";
import Paragraph from "@tiptap/extension-paragraph";


export default function Tiptap({ displayedRules, highlightString, isPasswordFinal }) {
    const tc = TextController.getInstance();

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
                onUpdate({ editor, transaction}) {
                    if (transaction.meta.uiEvent === "paste") {
                        editor.chain().focus().setFontFamily('Monospace').setFontSize('28px').run();
                    }
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
        content: tc.getHtml(),
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
            },
        },
        onUpdate({ editor }) {
            tc.updateText(editor.getHTML());
            tc.editor = editor;
        },
    });

    useEffect(() => {
        if (isPasswordFinal && editor) {
            const editorElement = document.getElementsByClassName('tiptap ProseMirror')[0];
            editorElement.classList.add('password-final');
            editor.setEditable(false);
        }
    }, [isPasswordFinal, editor]);

    return (
        <>
            <div className='password-box'>
                <div className='password-label'>
                    {!isPasswordFinal ? 'Please choose a password' : 'Your Password'}
                </div>
                <div className='password-box-inner' spellCheck="false">
                    <HighlightedText highlightedText={highlightString} />
                    <EditorContent editor={editor} />
                    <div className='password-length show-password-length' style={{ opacity: tc.getTrueClearLength() === 0 || isPasswordFinal ? 0 : 1 }} >
                        {tc.getTrueClearLength()}
                    </div>
                </div>
            </div>
            {!isPasswordFinal && <Toolbar editor={editor} displayedRules={displayedRules} />}
        </>
    )
}