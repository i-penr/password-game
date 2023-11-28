import React from "react";

export class GenericRule extends React.Component {
    static fulfilled = false;

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
    }

    constructor(text) {
        super();
        this.text = text;
    }

    highlightLetters() {
        return new RegExp(/^$/);
    }

    render() {
        return;
    }
}