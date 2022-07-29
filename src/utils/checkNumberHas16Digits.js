export const checkNumberHas16Digits = (number) => {
  if (number) {
    return number.match(/^[0-9]{16}$/);
  }
};
