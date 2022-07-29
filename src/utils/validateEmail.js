export const validateEmail = (email) => {
  if (email) {
    return email.match(/\S+@\S+\.\S+/);
  }
};
