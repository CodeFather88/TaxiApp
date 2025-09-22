import { Injectable, Inject } from "@nestjs/common";
import { type IPasswordHasher } from "src/shared/security/password-hasher.port";
import { type AuthUser, type CreateAuthUser } from "../domain/types/auth-user.types";
import { type IJwtAdapter } from "../domain/ports/jwt.port";
import { type IAuthUserRepository } from "../domain/ports/auth-user.repository.port";
import { TOKENS, UnauthorizedError, ConflictError } from "src/shared/types";
import { RegisterCommand } from "./commands/register.command";
import { LoginCommand } from "./commands/login.command";

@Injectable()
export class AuthService {
    constructor(
        @Inject(TOKENS.IAuthUserRepository) private readonly usersRepo: IAuthUserRepository,
        @Inject(TOKENS.IJwtAdapter) private readonly jwtAdapter: IJwtAdapter,
        @Inject(TOKENS.IPasswordHasher) private readonly passwordHasher: IPasswordHasher,
    ) { }

    async register(data: RegisterCommand): Promise<AuthUser> {
        const existing = await this.usersRepo.findByPhone(data.phoneNumber);
        if (existing) throw new ConflictError("User already exists");

        const hashed = await this.passwordHasher.hash(data.password);
        const toCreate: CreateAuthUser = {
            phoneNumber: data.phoneNumber,
            password: hashed,
            name: data.name,
            role: data.role,
        };
        const user = await this.usersRepo.create(toCreate);
        return user;
    }

    async login({ phoneNumber, password }: LoginCommand) {
        const user = await this.usersRepo.findByPhone(phoneNumber);
        if (!user) throw new UnauthorizedError("Invalid credentials");

        const valid = await this.passwordHasher.compare(password, user.password);
        if (!valid) throw new UnauthorizedError("Invalid credentials");

        const token = await this.jwtAdapter.sign({ id: user.id, role: user.role });
        return { token };
    }
}
