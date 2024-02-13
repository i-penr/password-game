import { useEffect, useState } from 'react';
import { Ruleset } from '../utils/Ruleset';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Rule from './Rule';
import { Rule11 } from '../utils/rules/Rule11';
import HighlightedText from './HighlightedText';
import { TextController } from '../utils/TextController';
import ContentEditable from './ContentEditable.tsx'; 

function GameZone() {
    const [htmlText, setHtmlText] = useState('');
    const [clearText, setClearText] = useState('');
    const [displayedRules, setDisplayedRules] = useState(new Ruleset([]));
    const [hiddenRules, setHiddenRules] = useState(new Ruleset());
    const [highlight, setHighlight] = useState('');

    const tc = new TextController(updateTextStates);

    function handleOnChange(e) {
        TextController.updateText(e);   

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
        <div className={`password-wrapper ${displayedRules.includesRuleNum(19) ? 'has-toolbar' : ''}`}>
            {
                displayedRules.includesRuleNum(18) && !clearText.includes("🥚") && <div className='death-screen'>
                    <div className='death-screen-strip'>
                        Paul has been slain
                    </div>
                </div>
            }
            <div className='password-box'>
                <div className='password-label'>
                    Please choose a password
                </div>
                <div className='password-box-inner'>
                    <HighlightedText rawText={clearText} highlight={highlight} />
                    <ContentEditable html={htmlText} onChange={(e) => handleOnChange(e.target.value)} className='ProseMirror' />
                    <div className='password-length show-password-length' style={{ opacity: clearText.length === 0 ? 0 : 1 }} >
                        {clearText.length}
                    </div>
                </div>
            </div>
            <div className='toolbar' style={{ display: displayedRules.includesRuleNum(19) ? 'inherit' : 'none' }}>
                <button onClick={boldSelected} >
                    Bold
                </button>
            </div>
            {htmlText}
            <div className='Rules'>
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

export default GameZone;