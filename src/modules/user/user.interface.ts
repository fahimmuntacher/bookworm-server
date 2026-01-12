export type Role = "admin" | "user";

export interface UserInterface {
  authId: string;
  name: string;
  email: string;
  role: Role;
  image: string | null;
  createdAt: Date;
}

export interface SignInInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}
