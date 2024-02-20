import { GenericRule } from '../GenericRule';
import React from 'react';
import captchas from '../captchas.json';

export class Rule10 extends GenericRule {

    static instance = new Rule10();

    constructor() {
        super();
        this.number = 10;
        this.desc = 'Your password must include this CAPTCHA:';
        this.state = {
            randomCaptcha: captchas[Math.floor(Math.random() * captchas.length)]
        }
    }

    getClass() {
        return Rule10;
    }

    checkRule() {
        const text = this.textController.getClear();
        const answer = this.state.randomCaptcha.substring(0, this.state.randomCaptcha.indexOf("."));
        
        this.getClass().fulfilled = text.includes(answer);
    }

    render() {
        return (
            <div className='captcha-wrapper'>
                <img className='captcha-img' src={`/captchas/${this.getClass().getInstance().state.randomCaptcha}`} alt='captcha-img' />
                <img src="/refresh.svg" className="captcha-refresh" onClick={() => this.refreshCaptcha()} alt='captcha-refresh-button' />
            </div>
        )
    }

    refreshCaptcha() {
        this.setState({
            randomCaptcha: captchas[Math.floor(Math.random() * captchas.length)]
        });

        this.getClass().getInstance().state.randomCaptcha = this.state.randomCaptcha;
    }
}
