const _validateLength = (text, options) => {
  if (typeof text !== "string") return false;
  const textLength = text.trim().length;

  if (options.min && textLength < options.min) return false;
  if (options.max && textLength > options.max) return false;

  return true;
};

export const validateNameLength = (text) => {
  return _validateLength(text, { min: 3, max: 22 });
};

export const validatePasswordLength = (text) => {
  return _validateLength(text, { min: 8 });
};

export const validateTitleLength = (text) => {
  return _validateLength(text, { min: 2 });
};

export const validateContactContentLength = (text) => {
  return _validateLength(text, { min: 25 });
};

export const validateContentTitleLength = (text) => {
  return _validateLength(text, { min: 2, max: 60 });
};

export const validateContentLength = (text) => {
  return _validateLength(text, { min: 500 });
};

export const validateDescriptionLength = (text) => {
  return _validateLength(text, { max: 250 });
};

export const validateCommentLength = (text) => {
  return _validateLength(text, { max: 250 });
};
