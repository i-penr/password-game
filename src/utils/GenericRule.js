import React from "react";
import { TextController } from "./TextController";

export class GenericRule extends React.Component {
    static fulfilled = false;

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
    }

    constructor() {
        super();
        this.textController = TextController.getInstance();
        this.text = this.textController.getClear();
    }

    getHighlightRule() {
        return new RegExp(/^$/);
    }

    render() {
        return;
    }
}