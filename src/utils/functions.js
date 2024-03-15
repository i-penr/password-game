export function getAllRegexMatches(text, regex) {
    const matches = text.match(regex);
    if (matches) {
        return matches;
    }
    return [];
}

export function getFormattedStringsInText(format, text) {
    const formatClose = format.split(' ')[0];
    let zones = text.split(`<${format}>`).slice(1).filter((elem) => elem.includes(`</${formatClose}>`));
    let formated = [];

    zones.forEach((rawArea) => {
        formated.push(rawArea.split(`</${formatClose}>`)[0]); // left part of </format>
    });

    return formated;
}