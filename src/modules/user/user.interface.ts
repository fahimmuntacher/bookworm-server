export type Role = "admin" | "user";

export interface User {
  authId: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}