export class GenericRule {
    constructor(text) {
        this.text = text;
        this.fulfilled = false;
    }

    highlightLetters() {
        return new RegExp(/^$/);
    }

    addAdditionalHtml() {
        return '';
    }
}