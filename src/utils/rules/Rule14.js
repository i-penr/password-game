import { GenericRule } from '../GenericRule';
import React from 'react';
import places from '../geo.json';
import countries from '../countries.json';

export class Rule14 extends GenericRule {
    static instance = new Rule14();
    static randomPlace = places[Math.floor(Math.random() * places.length)];
    static foundCountries;

    constructor() {
        super();
        this.number = 14;
        this.desc = 'Your password must include the name of this country.';
    }

    getClass() {
        return Rule14;
    }

    checkRule() {
        const text = this.textController.getClear();
        const lowercase = text.toLowerCase();
        const lowercaseCountry = this.getClass().randomPlace.title.toLowerCase();
        
        this.getClass().foundCountries = findCountryInText(lowercase);
        this.getClass().fulfilled = lowercase.includes(lowercaseCountry);
    }

    render() {
        return (
            <div>
                {
                    this.getClass().foundCountries && this.getClass().foundCountries.length > 0 && !this.fulfilled &&
                    <div className='guesses'>
                        {
                            this.getClass().foundCountries.map((elem, index) => (
                                <div key={index}>
                                    <img className='guess-icon' src='/error.svg' alt='guess-icon' />
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
                        title='geo'
                    />
                </div>
            </div>
        )
    }

}

function findCountryInText(text) {
    return countries.filter((elem) => text.includes(elem.toLowerCase()));
}