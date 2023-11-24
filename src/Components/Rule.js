import React from "react";

function Rule({ rule, flippedProps }) {
    return (
        <div className={`rule ${rule.fulfilled ? 'rule-correct' : 'rule-error'}`} {...flippedProps} >
            <span className={`rule-top ${rule.fulfilled ? 'rule-top-correct' : 'rule-top-error'}`}>
                <img className="rule-icon" alt="rule-icon" src={`${rule.fulfilled ? '/checkmark.svg' : '/error.svg'}`} />
                Rule {rule.number}
            </span>
            <div className="rule-desc">
                {rule.desc}
                {React.createElement(rule.getClass())}
            </div>

        </div>
    )
}

export default Rule;