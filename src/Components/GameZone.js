import { useEffect, useState } from 'react';
import { Ruleset } from '../utils/Ruleset';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Rule from './Rule';
import { Rule11 } from '../utils/rules/Rule11';
import { TextController } from '../utils/TextController';
import { Paul } from '../utils/Paul.js';
import Tiptap from './Tiptap.jsx';

function GameZone() {
    const [displayedRules, setDisplayedRules] = useState(new Ruleset([]));
    const [hiddenRules, setHiddenRules] = useState(new Ruleset());
    const [highlight, setHighlight] = useState('');

    const paul = Paul.getInstance();
    const tc = TextController.getInstance();
    tc.setTextUpdateFunction(applyTextChanges);

    async function applyTextChanges() {
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

    useEffect(() => {
        preLoadNecessaryAssets();
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
            <Tiptap displayedRules={displayedRules} highlight={highlight} />
            {tc.getHtml()}
            <div className='Rules'>
                <Flipper flipKey={[...displayedRules.rules]}>
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