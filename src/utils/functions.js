export function getAllRegexMatches(text, regex) {
    const matches = text.match(regex);
    if (matches) {
        return matches;
    }
    return [];
}