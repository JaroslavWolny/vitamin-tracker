
/**
 * Gets today's date as a string in 'YYYY-MM-DD' format.
 * This format is ideal for reliable string comparisons.
 * @returns {string} The formatted date string.
 */
export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Formats a date for display in Czech format.
 * @returns {string} The formatted date string for display.
 */
export const getFriendlyDate = (): string => {
    return new Date().toLocaleDateString('cs-CZ', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
}
