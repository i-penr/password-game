import { useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Ruleset } from '../utils/Ruleset';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Rule from './Rule';
import { Rule11 } from '../utils/rules/Rule11';
import HighlightedText from './HighlightedText';
import { TextController } from '../utils/TextController';

/*
 * TODO: Reduce coupling, specially with Rule19 and Rule20. 
 * 
 * Maybe this whole code needs to be refactored for this. The
 * problem is when the rule needs to interact directly with 
 * the elements on this component. The solution? I don't know yet.
 */

function GameZone() {
    const [htmlText, setHtmlText] = useState('');
    const [clearText, setClearText] = useState('');
    const [displayedRules, setDisplayedRules] = useState(new Ruleset([]));
    const [hiddenRules, setHiddenRules] = useState(new Ruleset());
    const [highlight, setHighlight] = useState('');

    const tc = new TextController(updateTextStates);

    function handleOnChange(e) {
        TextController.updateText(e.target.value);

        updateTextStates();
        recheckRules();

        displayedRules.sort();
        setHighlight(displayedRules.rules[0].getHighlightRule());
    }

    function recheckRules() {
        let newDisplayed = new Ruleset(displayedRules.rules);
        let newHidden = new Ruleset(hiddenRules.rules);

        while (newDisplayed.checkAllRules() && newHidden.rules.length > 0) {
            const rule = newHidden.rules[0];
            newDisplayed.addRule(rule);
            newHidden.removeRule(rule);
        }

        setDisplayedRules(() => newDisplayed);
        setHiddenRules(() => newHidden);
    }

    function setRule19Text(text) {
        const rule19 = displayedRules.rules.filter((rule) => rule.number === 19)[0];

        if (rule19) {
            rule19.htmlText = text;
        }
    }

    function preLoadNecessaryAssets() {
        Rule11.getWordleAnswer();
    }

    // Temporary solution, I know this is deprecated...
    function boldSelected() {
        document.execCommand('bold', false, null);
    }

    function updateTextStates() {
        displayedRules.setText(tc.getClear());
        hiddenRules.setText(tc.getClear());

        setClearText(tc.getClear());
        setRule19Text(tc.getHtml());
        setHtmlText(tc.getHtml());
    }

    useEffect(() => {
        preLoadNecessaryAssets();

        return () => {
            setHtmlText('');
            setClearText('');
        };
    }, []);

    return (
        <div className={`password-wrapper ${isRuleXDisplayed(displayedRules, 19) ? 'has-toolbar' : ''}`}>
            <div className='password-box'>
                <div className='password-label'>
                    Please choose a password
                </div>
                <div className='password-box-inner'>
                    <HighlightedText rawText={clearText} highlight={highlight} />
                    <div>
                        <ContentEditable
                            className="ProseMirror"
                            html={htmlText}
                            onChange={handleOnChange}
                            spellCheck="false"
                            translate="no"
                            tabIndex={0}
                        />
                    </div>
                    <div className='password-length show-password-length' style={{ opacity: clearText.length === 0 ? 0 : 1 }} >
                        {clearText.length}
                    </div>
                    <div className='toolbar' style={{ display: isRuleXDisplayed(displayedRules, 19) ? 'inherit' : 'none' }}>
                        <button onClick={boldSelected} >
                            Bold
                        </button>
                    </div>
                </div>
            </div>
            <div className='Rules'>
                <h1>{htmlText}</h1>
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


function isRuleXDisplayed(ruleset, x) {
    return ruleset.rules.filter((rule) => rule.number === x).length > 0;
}

export default GameZone;