export interface AuthUser {
  id: number;
  phoneNumber: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateAuthUser = Omit<AuthUser, "id" | "createdAt" | "updatedAt">;
