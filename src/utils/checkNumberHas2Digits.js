export const checkNumberHas2Digits = (number) => {
  if (number) {
    return number.match(/^[0-9]{1,2}$/);
  }
};
