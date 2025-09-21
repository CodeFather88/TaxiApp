import { UserEntity } from "./user.entity";

export interface IUserRepository {
    updatePassword(userId: number, hashedPassword: string): Promise<boolean>;
    findById(id: number): Promise<UserEntity | null>;
}
