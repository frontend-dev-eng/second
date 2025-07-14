/**
 * The function takes a date input and returns the time in 12-hour format with AM/PM.
 * @param {string|Date} date - The input date that needs to be formatted into a readable time format.
 * @returns {string} The function `getFormatTime` returns a formatted time string in 12-hour format with AM/PM
 * based on the input date.
 */
export const getFormatTime = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return 'Invalid Time';
  }
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

/**
 * The function takes a date string, formats it to display the date, month, and year in a specific
 * format, and returns the formatted date as a string.
 * @param {string|Date} date - The input date that needs to be formatted.
 * @returns {string} The function `getFormatDate` returns a formatted date string in the format of "DD Mon YYYY", 
 * where DD is the day of the month, Mon is the abbreviated month name, and YYYY is the year.
 */
export const getFormatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return 'Invalid Date';
  }
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};
