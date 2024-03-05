import * as React from 'react';
import deepEqual from 'fast-deep-equal';
import * as PropTypes from 'prop-types';
import { Paul } from '../utils/Paul';

/*
 * Code edited and repurposed from react-content-editable: https://github.com/lovasoa/react-contenteditable
 */

function normalizeHtml(str: string): string {
    return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ').replace(/<br \/>/g, '<br>');
}

function replaceCaret(el: HTMLElement, cursorPosition: number) {
    const target = el.firstChild;
    const isTargetFocused = document.activeElement === el;

    if (target !== null && target.nodeValue !== null && isTargetFocused) {
        const sel = window.getSelection();

        if (sel !== null) {
            const range = document.createRange();
            const position = Math.min(cursorPosition, target.nodeValue.length);
            range.setStart(target, position);
            range.collapse(true);
            const currentRange = sel.getRangeAt(0);
            if (
                currentRange.startContainer !== range.startContainer ||
                currentRange.startOffset !== range.startOffset
            ) {
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }

        if (el instanceof HTMLElement) el.focus();
    }
}

/**
 * A simple component for an html element with editable contents.
 */
export default class ContentEditable extends React.Component<Props> {
    [x: string]: any;
    lastHtml: string = this.props.html;
    el: any = typeof this.props.innerRef === 'function' ? { current: null } : React.createRef<HTMLElement>();
    cursorPosition: any = React.createRef<number>();

    getEl = () => (this.props.innerRef && typeof this.props.innerRef !== 'function' ? this.props.innerRef : this.el).current;


    saveCursorPosition = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            this.cursorPosition.current = range.startOffset;
        }
    }

    render() {
        const { tagName, html, innerRef, ...props } = this.props;

        return React.createElement(
            tagName || 'div',
            {
                ...props,
                ref: typeof innerRef === 'function' ? (current: HTMLElement) => {
                    innerRef(current)
                    this.el.current = current
                } : innerRef || this.el,
                onInput: this.emitChange,
                onBlur: this.props.onBlur || this.emitChange,
                onKeyUp: this.props.onKeyUp || this.emitChange,
                onKeyDown: this.props.onKeyDown || this.emitChange,
                contentEditable: !this.props.disabled,
                dangerouslySetInnerHTML: { __html: html }
            },
            this.props.children);
    }

    shouldComponentUpdate(nextProps: Props): boolean {
        const { props } = this;
        const el = this.getEl();
        this.saveCursorPosition();

        // We need not rerender if the change of props simply reflects the user's edits.
        // Rerendering in this case would make the cursor/caret jump

        // Rerender if there is no element yet... (somehow?)
        if (!el) return true;

        // ...or if html really changed... (programmatically, not by user edit)
        if (
            normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML)
        ) {
            return true;
        }

        // Handle additional properties
        return props.disabled !== nextProps.disabled ||
            props.tagName !== nextProps.tagName ||
            props.className !== nextProps.className ||
            props.innerRef !== nextProps.innerRef ||
            !deepEqual(props.style, nextProps.style);
    }

    componentDidMount(): void {
        const el = this.getEl();

        el.onpaste = function preventPastingMultipleEggs(e: ClipboardEvent) {
            const el = document.getElementsByClassName('ProseMirror')[0];
            const pastedText = e.clipboardData!.getData('text');
            const paul = Paul.getInstance();
        
            // Allowing pasting more than one egg will be cheating (you can just paste a bunch of eggs and Paul does not die)
            if (paul && el.innerHTML.includes(paul.state) && pastedText.includes(paul.state)) e.preventDefault();
        }
    }

    componentDidUpdate() {
        const el = this.getEl();
        if (!el) return;

        // Perhaps React (whose VDOM gets outdated because we often prevent
        // rerendering) did not update the DOM. So we update it manually now.
        if (this.props.html !== el.innerHTML) {
            el.innerHTML = this.props.html;
        }

        this.lastHtml = this.props.html;
        replaceCaret(el, this.cursorPosition.current);
    }

    emitChange = (originalEvt: React.SyntheticEvent<any>) => {
        const el = this.getEl();
        if (!el) return;

        const html = el.innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            // Clone event with Object.assign to avoid
            // "Cannot assign to read only property 'target' of object"
            const evt = Object.assign({}, originalEvt, {
                target: {
                    value: html
                }
            });
            this.props.onChange(evt);
        }
        this.lastHtml = html;
    }

    static propTypes = {
        html: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        tagName: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        innerRef: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
        ])
    }
}

export type ContentEditableEvent = React.SyntheticEvent<any, Event> & { target: { value: string } };
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
type DivProps = Modify<JSX.IntrinsicElements["div"], { onChange: ((event: ContentEditableEvent) => void) }>;

export interface Props extends DivProps {
    html: string,
    disabled?: boolean,
    tagName?: string,
    className?: string,
    style?: Object,
    innerRef?: React.RefObject<HTMLElement> | Function,
}