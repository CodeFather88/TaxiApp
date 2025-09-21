import { Injectable, UnauthorizedException, ConflictException, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtAdapter } from "../adapters/jwt.adapter";
import { type UserEntity } from "../../users/domain/user.entity";
import { RegisterDto } from "../dto/register.dto";
import { type IJwtAdapter } from "../domain/jwt.adapter.interface";
import { DrizzleUsersAdapter } from "src/modules/users/adapters/drizzle-users.adapter";
import { type IAuthUserRepository } from "../domain/auth-user.repository";

@Injectable()
export class AuthService {
    constructor(
        @Inject(DrizzleUsersAdapter) private readonly usersRepo: IAuthUserRepository,
        @Inject(JwtAdapter) private readonly jwtAdapter: IJwtAdapter
    ) { }

    async register(data: RegisterDto): Promise<UserEntity> {
        const existing = await this.usersRepo.findByPhone(data.phoneNumber);
        if (existing) throw new ConflictException("User already exists");

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
        if (!user) throw new UnauthorizedException("Invalid credentials");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException("Invalid credentials");

        const token = await this.jwtAdapter.sign({ id: user.id, role: user.role });
        return { accessToken: token, user };
    }
}
