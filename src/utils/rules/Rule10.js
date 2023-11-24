import { GenericRule } from '../GenericRule';
import React from 'react';

// The "dirty" non-dynamic way :(
const captchas = ["264m5.png", "573d8.png", "77n6g.png", "8y63f.png", "cffp4.png", "f6ne5.png", "nnfx3.png",
    "33p4e.png", "5n245.png", "7gmf3.png", "b84xc.png", "cpc8c.png", "gc277.png", "p4pde.png", "x6b5m.png",
    "34pcn.png", "66wp5.png", "7wnpm.png", "bbymy.png", "d22bd.png", "gny6b.png", "pcede.png", "xgcxy.png",
    "3p4nn.png", "6gnm3.png", "7xd5m.png", "bgd4m.png", "dbfen.png", "gw53m.png", "pdyc8.png", "xngxc.png",
    "3pe4g.png", "6xxdx.png", "7y2x4.png", "bnc2f.png", "dn26n.png", "mgw3n.png", "pf5ng.png", "y4n6m.png",
    "3w2bw.png", "73mnx.png", "88y52.png", "bw6n6.png", "dn5df.png", "n2by7.png", "w8f36.png", "y7mnm.png",
    "44xe8.png", "74eyg.png", "8gecm.png", "edcb3.png", "e7x45.png", "n3ffn.png", "x38fn.png", "yd755.png",
    "53wb8.png", "75pfw.png", "8pfxx.png", "cen55.png", "ebcbx.png", "ng2gw.png", "x4gg5.png", "x3fwf.png"]

export class Rule10 extends GenericRule {

    static instance = new Rule10(this.text);

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
    }

    constructor(text) {
        super(text);
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
        const answer = this.state.randomCaptcha.substring(0, this.state.randomCaptcha.indexOf("."));
        this.fulfilled = this.text.includes(answer);
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
        this.getClass().getInstance().checkRule();
    }
}
