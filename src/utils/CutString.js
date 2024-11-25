/**
 * Recorta una cadena de texto si excede una longitud máxima y agrega "..." al final.
 * Si la cadena es más corta que la longitud máxima, se devuelve tal cual.
 * 
 * @param {string} str - La cadena de texto que se desea recortar.
 * @param {number} maxLen - La longitud máxima permitida para la cadena.
 * @returns {string} - La cadena recortada si es necesario, con "..." añadido al final.
 */

const CutString = (str, maxLen) => {
    return str.length > maxLen ? str.substring(0, maxLen-3) + '...' : str;
}

export default CutString;