/**
 * Formats a given date input to the format DD-MM-YYYY.
 *
 * @param {string|Date} dateInput - The input date to be formatted. Can be a date string or a Date object.
 * @returns {string} The formatted date string in DD-MM-YYYY format.
 */
export const formatDateToDDMMYYYY = (dateInput)=> {
  const date = new Date(dateInput); // Convierte el input a objeto Date

  const day = String(date.getDate()+1).padStart(2, "0"); // Obtiene el día (dd)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtiene el mes (mm), suma 1 porque los meses empiezan desde 0
  const year = date.getFullYear(); // Obtiene el año (yyyy)

  return `${day}-${month}-${year}`;
}

export const formatDateToYYYYMMDD = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

/**
 * Formats a given date input to the format DD/MM/YYYY for view.
 *
 * @param {string|Date} dateInput - The input date to be formatted. Can be a date string or a Date object.
 * @returns {string} The formatted date string in DD/MM/YYYY format.
 */
export const formatDateToDDMMYYYYView = (dateInput)=> {
  const date = new Date(dateInput); // Convierte el input a objeto Date

  const day = String(date.getDate()+1).padStart(2, "0"); // Obtiene el día (dd)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtiene el mes (mm), suma 1 porque los meses empiezan desde 0
  const year = date.getFullYear(); // Obtiene el año (yyyy)

  return `${day}/${month}/${year}`;
}

/**
 * Formats a given date input to the format YYYY/MM/DD for view.
 *
 * @param {string|Date} dateInput - The input date to be formatted. Can be a date string or a Date object.
 * @returns {string} The formatted date string in YYYY/MM/DD format.
 */
export const formatDateToYYYYMMDDView = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return `${year}/${month}/${day}`;
};