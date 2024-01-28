import { useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Ruleset } from '../utils/Ruleset';
import sanitizeHtml from 'sanitize-html';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Rule from './Rule';
import { Rule11 } from '../utils/rules/Rule11';
import HighlightedText from './HighlightedText';

function GameZone() {
    const [htmlText, setHtmlText] = useState('');
    const [clearText, setClearText] = useState('');
    const [displayedRules, setDisplayedRules] = useState(new Ruleset([]));
    const [hiddenRules, setHiddenRules] = useState(new Ruleset());
    const [highlight, setHighlight] = useState('');

    function handleOnChange(e) {
        const newText = e.target.value;

        updateText(newText);

        let newDisplayed = new Ruleset(displayedRules.rules);
        let newHidden = new Ruleset(hiddenRules.rules);

        while (newDisplayed.checkAllRules() && newHidden.rules.length > 0) {
            const rule = newHidden.rules[0];
            newDisplayed.addRule(rule);
            newHidden.removeRule(rule);
        }

        displayedRules.sort();

        setHighlight(displayedRules.rules[0].getHighlightRule());

        setDisplayedRules(() => newDisplayed);
        setHiddenRules(() => newHidden);
    }

    function updateText(text) {
        const sanitizedText = sanitize(text, []);

        setHtmlText(() => sanitize(text, ['b']));
        setClearText(() => sanitizedText);

        hiddenRules.setText(sanitizedText);
        displayedRules.setText(sanitizedText);

        setRule19Text(text);
    }

    function setRule19Text(text) {
        const rule19 = displayedRules.rules.filter((rule) => rule.number === 19)[0];

        if (rule19) {
            rule19.htmlText = text;
        }
    }

    function sanitize(text, allowedTags) {
        return sanitizeHtml(text, { allowedTags: allowedTags });
    }

    function preLoadNecessaryAssets() {
        Rule11.getWordleAnswer();
    }

    // Temporary solution, I know this is deprecated...
    function boldSelected() {
        document.execCommand('bold', false, null);
    }

    useEffect(() => {
        preLoadNecessaryAssets();

        return () => {
            setHtmlText('');
        };
    }, []);

    function addTestPassword() {
        setHtmlText('55555@PepsidecemberXXXV');
        handleOnChange({ target: { value: '55555@PepsidecemberXXXV' } })
    }

    return (
        <div className={`password-wrapper ${isRule19Displayed(displayedRules) ? 'has-toolbar' : ''}`}>
            <div className='password-box'>
                <div className='password-label'>
                    Please choose a password
                </div>
                <button onClick={addTestPassword}>
                    Test
                </button>
                <div className='password-box-inner'>
                    <HighlightedText rawText={clearText} highlight={highlight} />
                    <div>
                        <ContentEditable
                            className='ProseMirror'
                            html={htmlText}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='password-length show-password-length' style={{ opacity: clearText.length === 0 ? 0 : 1 }} >
                        {clearText.length}
                    </div>
                    <div className='toolbar' style={{ display: isRule19Displayed(displayedRules) ? 'inherit' : 'none' }}>
                        <button onClick={boldSelected} >
                            Bold
                        </button>
                    </div>
                </div>
            </div>
            <div className='Rules'>
                <h1>{clearText}</h1>
                <Flipper flipKey={htmlText}>
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

function isRule19Displayed(ruleset) {
    return ruleset.rules.filter((rule) => rule.number === 19).length > 0;
}

export default GameZone;