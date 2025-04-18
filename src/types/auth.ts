export type authCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  data: any | null;
  error: string | null;
};
