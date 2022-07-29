export const checkNumberOnlyHas3Digits = (number) => {
  if (number) {
    return number.match(/^[0-9]{3}$/);
  }
};
