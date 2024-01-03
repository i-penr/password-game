import { GenericRule } from '../GenericRule';
import React from 'react';
import places from '../geo.json';
import countries from '../countries.json';

export class Rule14 extends GenericRule {
    static instance = new Rule14(this.text);
    static randomPlace = places[Math.floor(Math.random() * places.length)];
    static foundCountries;

    constructor(text) {
        super(text);
        this.number = 14;
        this.desc = 'Your password must include the name of this country.';
    }

    getClass() {
        return Rule14;
    }

    checkRule() {
        this.findCountryInText();
        const lowercase = this.text.toLowerCase();
        const lowercaseCountry = this.getClass().randomPlace.title.toLowerCase();

        this.getClass().fulfilled = lowercase.includes(lowercaseCountry);
    }

    findCountryInText() {
        this.getClass().foundCountries = countries.filter((elem) => this.text.toLowerCase().includes(elem.toLowerCase()));
    }

    render() {
        return (
            <div>
                {
                    this.getClass().foundCountries && this.getClass().foundCountries.length > 0 && !this.fulfilled &&
                    <div className='guesses'>
                        {
                            this.getClass().foundCountries.map((elem) => (
                                <div>
                                    <img className='guess-icon' src='/error.svg' />
                                    {elem}
                                </div>

                            ))
                        }
                    </div>
                }
                <div className='geo-wrapper'>
                    <iframe
                        src={this.getClass().randomPlace.embed}
                        width="100%"
                        height="100%"
                        className='geo'
                    />
                </div>
            </div>
        )
    }

}

