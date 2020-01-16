module.exports = {
    stringToArray(string) {
        return string.split(',').map(strings => strings.trim());
    }
}