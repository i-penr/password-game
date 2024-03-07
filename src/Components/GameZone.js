import { useEffect, useState } from 'react';
import { Ruleset } from '../utils/Ruleset';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Rule from './Rule';
import { Rule11 } from '../utils/rules/Rule11';
import HighlightedText from './HighlightedText';
import { TextController } from '../utils/TextController';
import ContentEditable from './ContentEditable.tsx';
import { Paul } from '../utils/Paul.js';

function GameZone() {
    const [htmlText, setHtmlText] = useState('');
    const [clearText, setClearText] = useState('');
    const [displayedRules, setDisplayedRules] = useState(new Ruleset([]));
    const [hiddenRules, setHiddenRules] = useState(new Ruleset());
    const [highlight, setHighlight] = useState('');

    const paul = Paul.getInstance();
    const tc = TextController.getInstance();
    tc.setTextUpdateFunction(applyTextChanges);

    function handleOnChange(e) {
        tc.updateText(e);
    }

    async function applyTextChanges() {
        updateTextStates();
        await recheckRules();

        displayedRules.sort();
        setHighlight(displayedRules.rules[0].getHighlightRule());
    }

    async function recheckRules() {
        let newDisplayed = new Ruleset(displayedRules.rules);
        let newHidden = new Ruleset(hiddenRules.rules);

        while (await newDisplayed.checkAllRules() && newHidden.rules.length > 0) {
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
    function formatText(format) {
        document.execCommand(format, false, null);
    }

    function updateTextStates() {
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
                paul.isDead && <div className='death-screen'>
                    <div className='death-screen-strip'>
                        {paul.deathReason}
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
                    <div className='password-length show-password-length' style={{ opacity: tc.getTrueClearLength() === 0 ? 0 : 1 }} >
                        {tc.getTrueClearLength()}
                    </div>
                </div>
            </div>
            <div className='toolbar' style={{ display: displayedRules.includesRuleNum(19) ? 'flex' : 'none' }}>
                <button onClick={() => formatText('bold')} >
                    Bold
                </button>
                {
                    displayedRules.includesRuleNum(26) && <button onClick={() => formatText('italic')}>
                        Italic
                    </button>
                }
                {
                    displayedRules.includesRuleNum(27) && <select>
                        <option value="Monospace">
                            Monospace
                        </option><option value="Comic Sans">
                            Comic Sans
                        </option><option value="Wingdings">
                            Wingdings
                        </option>
                    </select>
                }
            </div>
            {htmlText}
            <div className='Rules'>
                <Flipper flipKey={displayedRules.rules[0]}>
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