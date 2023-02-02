export type CreateUserDTO = { login: string; password: string };

export type UpdatePasswordDTO = {
  oldPassword: string;
  newPassword: string;
};
