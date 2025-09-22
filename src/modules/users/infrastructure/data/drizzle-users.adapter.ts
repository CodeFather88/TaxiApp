import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { users } from "src/database/drizzle/schema";
import { DRIZZLE } from "src/database/drizzle/drizzle.module";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { type IUserRepository } from "src/modules/users/domain/ports/user.repository.port";
import { UserEntity } from "../../domain/types/user.types";
// removed auth repository coupling

@Injectable()
export class DrizzleUsersAdapter implements IUserRepository {
    constructor(
        @Inject(DRIZZLE) private readonly db: NodePgDatabase<{ users: typeof users }>
    ) { }
    // user-specific methods only

    // creation handled by auth adapter

    async updatePassword(userId: number, hashedPassword: string): Promise<boolean> {
        const [updated] = await this.db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId)).returning({ id: users.id });
        return !!updated;
    }

    async findById(id: number): Promise<UserEntity | null> {
        const [user] = await this.db.select().from(users).where(eq(users.id, id));
        return user;
    }
}
