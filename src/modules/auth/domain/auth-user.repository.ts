import { UserEntity } from "src/modules/users/domain/user.entity";

export interface IAuthUserRepository {
    findByPhone(phoneNumber: string): Promise<UserEntity | null>;
    create(user: Omit<UserEntity, "id" | "createdAt" | "updatedAt">): Promise<UserEntity>;
}
