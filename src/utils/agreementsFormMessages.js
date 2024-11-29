/**
 * @constant {Object} messages - Object containing validation messages for the agreements form.
 * @property {string} country - Validation message for the country field.
 * @property {string} code - Validation message for the code field.
 * @property {string} intitution - Validation message for the institution field.
 * @property {string} startDate - Validation message for the start date field.
 * @property {string} scope - Validation message for the scope field.
 * @property {string} description - Validation message for the description field.
 */
export const messages = {
    country: "Nombre del país sin caracteres especiales o números",
    code: "Código del convenio sin letras, solo puede contener numeros, \".\" y \"-\"",
    intitution: "Nombre de la institución sin caracteres especiales o números",
    startDate: "Fecha de inicio del convenio",
    scope: "Ambito del convenio",
    description: "Descripción del convenio",
}