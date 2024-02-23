import { GenericRule } from '../GenericRule';
import { Paul } from '../Paul';
import { getAllRegexMatches } from '../functions';

const paul = Paul.getInstance();

/**
 * Paul eats 1 caterpillar every 15 seconds, with a maximum of 8 (or else he overeats).
 * When the last caterpillar is eaten, another 15s passes, if after that there are no caterpillars left, he starves.
 */
export class Rule23 extends GenericRule {
    static instance = new Rule23();

    constructor() {
        super();
        this.number = 23;
        this.desc = 'Paul has hatched! Please don\'t forget to feed him, he eats three 🐛 every minute.';
        this.hasFeedingStarted = false;
        this.feedingInterval = null;
    }

    componentDidMount() {
        paul.changeState('🐔');
    }

    getClass() {
        return Rule23;
    }

    checkRule() {
        const text = this.textController.getClear();

        this.hasFeedingStarted = this.hasFeedingStarted || text.includes('🐛');

        this.getClass().fulfilled = this.hasFeedingStarted;
        
        if (!this.feedingInterval && this.hasFeedingStarted) {
            this.startFeedingInterval();
        }
    }

    startFeedingInterval() {
        this.feedingInterval = setInterval(() => {
            const numCaterpillars = getAllRegexMatches(this.textController.clearText, /🐛/g).length;
            
            if (numCaterpillars === 0) {
                paul.killPaul("Paul has starved");
                clearInterval(this.feedingInterval);
                return;
            }

            if (numCaterpillars > 8) {
                paul.killPaul("Paul was overfed");
                clearInterval(this.feedingInterval);
                return;
            }

            this.eatCaterpillar();
        }, 15000);
    }

    eatCaterpillar() {
        const oldText = this.textController.rawText;
        const lastCatterpillar = oldText.lastIndexOf('🐛');
        const newText = oldText.slice(0, lastCatterpillar) + '' + oldText.slice(lastCatterpillar + 2);

        this.textController.updateText(newText);
    }
}