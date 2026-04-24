function isValidFormat(edgeStr) {
    if (typeof edgeStr !== 'string') return false;
    const trimmed = edgeStr.trim();
    const regex = /^[A-Z]->[A-Z]$/;
    if (!regex.test(trimmed)) {
        return false;
    }
    const [parent, child] = trimmed.split('->');
    if (parent === child) {
        return false; 
    }
    return true;
}
module.exports = {
    isValidFormat
};
