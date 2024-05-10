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
        /**
         * Due to problems with font families being capitalized or not capitalized sometimes when pasting (and more),
         * I have consiered that is better to calculate likeness and check if the strgings at least a 95% similar.
         */
        setArePasswordsEqual(finalTc.htmlText === tc.htmlText || 
                            (similarityPercentage(tc.htmlText, finalTc.htmlText) > 95 && tc.clearText === finalTc.clearText));
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

function levenshteinDistance(str1, str2) {
    const matrix = [];

    // Initialize the matrix with the values of the first row and column
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }

    // Return the Levenshtein distance
    return matrix[str2.length][str1.length];
}

function similarityPercentage(str1, str2) {
    const distance = levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    const similarity = ((maxLength - distance) / maxLength) * 100;
    return similarity.toFixed(2); // Round to 2 decimal places
}
