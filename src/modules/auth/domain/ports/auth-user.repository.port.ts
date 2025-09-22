import { type AuthUser, type CreateAuthUser } from "../types/auth-user.types";

export interface IAuthUserRepository {
    findByPhone(phoneNumber: string): Promise<AuthUser | null>;
    create(user: CreateAuthUser): Promise<AuthUser>;
}
