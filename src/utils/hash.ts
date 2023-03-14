import * as bcrypt from 'bcrypt';

export const hash = (input: string): Promise<string> => {
  const saltOrRounds = 10;
  return bcrypt.hash(input, saltOrRounds);
};

export const compareWithHash = (
  input: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(input, hash);
};
