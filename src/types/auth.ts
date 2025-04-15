export type SignUpCredentials = {
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  data: any | null;
  error: string | null;
};