/**
 * Method to capitalize first character of string
 * @param string - input string to capitalize
 * @returns string with capitalized first character
 */
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
