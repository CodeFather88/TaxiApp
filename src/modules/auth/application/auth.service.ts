import { Injectable, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { type UserEntity } from "../../users/domain/user.entity";
import { RegisterDto } from "../dto/register.dto";
import { type IJwtAdapter } from "../domain/jwt.adapter.interface";
import { type IAuthUserRepository } from "../domain/auth-user.repository";
import { TOKENS, UnauthorizedError, ConflictError } from "src/shared/types";

@Injectable()
export class AuthService {
    constructor(
        @Inject(TOKENS.IAuthUserRepository) private readonly usersRepo: IAuthUserRepository,
        @Inject(TOKENS.IJwtAdapter) private readonly jwtAdapter: IJwtAdapter
    ) { }

    async register(data: RegisterDto): Promise<UserEntity> {
        const existing = await this.usersRepo.findByPhone(data.phoneNumber);
        if (existing) throw new ConflictError("User already exists");

        const hashed = await bcrypt.hash(data.password, 10);
        const user = await this.usersRepo.create({
            phoneNumber: data.phoneNumber,
            password: hashed,
            name: data.name,
            role: data.role,
        });
        return user;
    }

    async login(phoneNumber: string, password: string) {
        const user = await this.usersRepo.findByPhone(phoneNumber);
        if (!user) throw new UnauthorizedError("Invalid credentials");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedError("Invalid credentials");

        const token = await this.jwtAdapter.sign({ id: user.id, role: user.role });
        return { accessToken: token, user };
    }
}
