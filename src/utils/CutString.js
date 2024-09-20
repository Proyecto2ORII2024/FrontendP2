const CutString = (str, maxLen) => {
    return str.length > maxLen ? str.substring(0, maxLen-3) + '...' : str;
}

export default CutString;