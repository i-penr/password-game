import { useEditor, EditorContent, mergeAttributes, Node, Mark, NodeViewWrapper } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import HighlightedText from "./HighlightedText";
import { TextController } from "../utils/TextController";
import { Paul } from "../utils/Paul";
import FontSize from "tiptap-extension-font-size";
import Paragraph from "@tiptap/extension-paragraph";
import React, { useEffect } from "react";


export default function Tiptap({ html, displayedRules, highlightString }) {
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
            Paragraph,
            TextStyle.configure({
                types: ['paragraph']
            }),
            FontFamily.configure({
                types: ['textStyle']
            }),
            FontSize.configure({
                types: ['textStyle']
            })],
        content: html,
        editorProps: {
            transformPasted: (pastedText, view) => {
                const paul = Paul.getInstance();

                // Allowing pasting more than one egg will be cheating (you can just paste a bunch of eggs and Paul does not die)
                if (paul && view.dom.innerHTML.includes(paul.state) && pastedText.content.toString().includes(paul.state)) return '';

                return pastedText;
            },
            transformPastedHTML: (html) => {
                const elementHtml = document.createElement('span');
                elementHtml.style.fontFamily = 'Monospace';
                elementHtml.style.fontSize = '28px';
                elementHtml.innerHTML = html;

                return elementHtml.outerHTML;
            }
        },
        onUpdate({ editor }) {
            tc.updateText(editor.getHTML());
            tc.editor = editor;
        }
    });

    // Apply deafault fontFamily Monospace and fontSize 28px to inputted text
    useEffect(() => {
        if (!editor) return;

        editor.chain().focus().selectAll().setFontFamily('Monospace').setFontSize('28px').run();

        editor.on('paste', (event) => {
            event.preventDefault();

            const pastedText = event.clipboardData.getData('text/plain');

            editor.chain().focus().selectAll().setFontFamily('Monospace').setFontSize('28px').run();
            editor.chain().focus().insertContent(pastedText).run();
        });

    }, [editor])

    return (
        <>
            <div className='password-box'>
                <div className='password-label'>
                    Please choose a password
                </div>
                <div className='password-box-inner' spellCheck="false">
                    <HighlightedText highlightedText={highlightString} />
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