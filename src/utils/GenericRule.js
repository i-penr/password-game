import React from "react";

export class GenericRule extends React.Component {
    constructor(text) {
        super();
        this.text = text;
        this.fulfilled = false;
    }

    highlightLetters() {
        return new RegExp(/^$/);
    }

    render() {
        return;
    }
}