import React from "react";

function Rule({ rule, flippedProps }) {
    return (
        <div className={`rule ${rule.getClass().fulfilled ? 'rule-correct' : 'rule-error'}`} {...flippedProps} >
            <span className={`rule-top ${rule.getClass().fulfilled ? 'rule-top-correct' : 'rule-top-error'}`}>
                <img className="rule-icon" alt="rule-icon" src={`${rule.getClass().fulfilled ? '/checkmark.svg' : '/error.svg'}`} />
                Rule {rule.number}
            </span>
            <div className="rule-desc">
                <div>
                    {rule.desc}
                    {rule.renderEmbededDesc === undefined ? null : rule.renderEmbededDesc()}
                </div>
                {React.createElement(rule.getClass())}
            </div>

        </div>
    )
}

export default Rule;