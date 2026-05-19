export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  role: string;
  is_active?: boolean;
}

export type ROLE = "admin" | "agent" | "user";
