import { User } from '../model';

export type CreateUserDTO = Omit<
  User,
  'id' | 'version' | 'createdAt' | 'updatedAt'
>;

export type UpdatePasswordDTO = {
  oldPassword: string;
  newPassword: string;
};
