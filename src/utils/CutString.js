/**
 * Trims a string if it exceeds a maximum length and appends "..." at the end.
 * If the string is shorter than the maximum length, it is returned as is.
 * 
 * @param {string} str - The string to be trimmed.
 * @param {number} maxLen - The maximum allowed length for the string.
 * @returns {string} - The trimmed string, if necessary, with "..." added at the end.
 */

const CutString = (str, maxLen) => {
    return str.length > maxLen ? str.substring(0, maxLen-3) + '...' : str;
}

export default CutString;