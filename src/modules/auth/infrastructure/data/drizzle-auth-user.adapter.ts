import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { users } from "src/database/drizzle/schema";
import { DRIZZLE } from "src/database/drizzle/drizzle.module";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { type IAuthUserRepository } from "../../domain/ports/auth-user.repository.port";
import { type AuthUser, type CreateAuthUser } from "../../domain/types/auth-user.types";

@Injectable()
export class DrizzleAuthUserAdapter implements IAuthUserRepository {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<{ users: typeof users }>
  ) { }

  async findByPhone(phoneNumber: string): Promise<AuthUser | null> {
    const [user] = await this.db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
    return (user as AuthUser) ?? null;
  }

  async create(userData: CreateAuthUser): Promise<AuthUser> {
    const [user] = await this.db.insert(users).values(userData as any).returning();
    return user as AuthUser;
  }
}


