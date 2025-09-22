import { UserEntity } from "../types/user.types";

export interface IUserRepository {
    updatePassword(userId: number, hashedPassword: string): Promise<boolean>;
    findById(id: number): Promise<UserEntity | null>;
}
