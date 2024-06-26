/**
 * Formats a date string, timestamp or date array into format used by DHIS2 and <input> date
 * @param {Date} date
 * @returns {String}
 */
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`; // xxxx-xx-xx
};

const lagTime = 10; // 10 days for ERA5-Land
const endDate = new Date();

endDate.setDate(endDate.getDate() - lagTime);
endDate.setDate(0); // Last day of the previous month

// First day 12 months back
const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 11, 1);

export const defaultPeriod = {
  startDate: formatDate(startDate),
  endDate: formatDate(endDate),
};

export const defaultReferencePeriod = "1991-2020";

export const getNumberOfMonths = (startMonth, endMonth) => {
  const startYear = parseInt(startMonth.substring(0, 4));
  const start = parseInt(startMonth.substring(5, 7));
  const endYear = parseInt(endMonth.substring(0, 4));
  const end = parseInt(endMonth.substring(5, 7));
  return (endYear - startYear) * 12 + (end - start) + 1;
};

export const getNumberOfDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end - start;
  return diff / (1000 * 60 * 60 * 24) + 1;
};

export const getNumberOfDaysFromPeriod = (period) =>
  getNumberOfDays(period.startDate, period.endDate);
