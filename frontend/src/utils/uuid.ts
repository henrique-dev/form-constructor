const { v4: generateId } = require('uuid');

export const uuidv4 = () => {
  return generateId();
};
