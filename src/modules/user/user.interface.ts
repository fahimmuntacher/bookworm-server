export type Role = "admin" | "user";

export interface User {
  authId: string;
  name: string;
  email: string;
  role: Role;
  image : string | null,
  createdAt: Date;
}
