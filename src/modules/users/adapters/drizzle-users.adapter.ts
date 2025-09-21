import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { users } from "src/database/drizzle/schema";
import { UserEntity } from "../../users/domain/user.entity";
import { DRIZZLE } from "src/database/drizzle/drizzle.module";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { type IUserRepository } from "src/modules/users/domain/user.repository";
import { type IAuthUserRepository } from "src/modules/auth/domain/auth-user.repository";

@Injectable()
export class DrizzleUsersAdapter implements IUserRepository, IAuthUserRepository {
    constructor(
        @Inject(DRIZZLE) private readonly db: NodePgDatabase<{ users: typeof users }>
    ) { }
    async findByPhone(phoneNumber: string): Promise<UserEntity | null> {
        const [user] = await this.db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
        return user ?? null;
    }

    async create(userData: Omit<UserEntity, "id" | "createdAt" | "updatedAt">): Promise<UserEntity> {
        const [user] = await this.db.insert(users).values(userData).returning();
        return user;
    }

    async updatePassword(userId: number, hashedPassword: string): Promise<boolean> {
        const [updated] = await this.db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId)).returning({ id: users.id });
        return !!updated;
    }

    async findById(id: number): Promise<UserEntity | null> {
        const [user] = await this.db.select().from(users).where(eq(users.id, id));
        return user;
    }
}
