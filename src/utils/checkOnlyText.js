export const checkOnlyText = (string) => {
  if (string) {
    return string.match(/^[a-zA-Z ]*$/);
  }
};
