import { v4 as uuid } from 'uuid';

export const generateUid = () => {
  return uuid();
};
