export const validateUsername = (name) => {
  if (name) {
    return name.match(/^[a-z0-9_-]{3,15}$/);
  }
};
