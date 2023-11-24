import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { Ruleset } from "../utils/Ruleset";
import sanitizeHtml from "sanitize-html";
import { Flipper, Flipped } from 'react-flip-toolkit';
import Rule from "./Rule";

function GameZone() {
    const [text, setText] = useState('');
    const [displayedRules, setDisplayedRules] = useState(new Ruleset(text, []));
    const [hiddenRules, setHiddenRules] = useState(new Ruleset(text));

    function handleOnChange(e) {
        const newText = e.target.value;
        setText(newText);
        hiddenRules.setText(newText);
        displayedRules.setText(newText);
        let newDisplayed = new Ruleset(newText, displayedRules.rules);
        let newHidden = new Ruleset(newText, hiddenRules.rules);

        while (newDisplayed.checkAllRules() && hiddenRules.rules.length > 0) {
            const rule = newHidden.rules[0];
            newDisplayed.addRule(rule);
            newHidden.removeRule(rule);
        }

        displayedRules.sort();

        setDisplayedRules(() => newDisplayed);
        setHiddenRules(() => newHidden);
    }

    /* const sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: { a: ["href"] },
    };

    const sanitize = () => {
        setText(sanitizeHtml(text, sanitizeConf));
    };
 */
    useEffect(() => {
        return () => {
            setText('');
        };
    }, []);

    function addTestPassword() {
        setText("55555@Pepsidecember");
        handleOnChange({ target: { value: "55555@Pepsidecember" } })
    }

    return (
        <div className="GameZone">
            <div className="password-box">
                <div className="password-label">
                    Please choose a password
                </div>
                <button onClick={addTestPassword}>
                    Test
                </button>
                <div className="password-box-inner">
                    <ContentEditable
                        className="ProseMirror"
                        tagName="p"
                        html={text}
                        onChange={handleOnChange}
                        /* onBlur={sanitize} */
                        style={{ fontFamily: "Monospace", fontSize: "28px" }}
                    />
                    <div className="password-length show-password-length" style={{opacity: text.length === 0 ? 0 : 1 }} >
                         { text.length }
                    </div>
                </div>
            </div>
            <div className="Rules">
                <h1>{text}</h1>
                <Flipper flipKey={text}>
                    {displayedRules.rules.map((rule) => (
                        <Flipped key={rule.number} flipId={rule.number}>
                            {flippedProps => <Rule rule={rule} flippedProps={flippedProps} />}
                        </Flipped>
                    ))}
                </Flipper>
            </div>
        </div >
    )
}

export default GameZone;