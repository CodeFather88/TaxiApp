import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAdapter } from "../infrastructure/security/jwt.adapter";
import { AuthService } from "./auth.service";
import { AuthController } from "../presenters/http/auth.controller";
import { DrizzleAuthUserAdapter } from "../infrastructure/data/drizzle-auth-user.adapter";
import { JwtGuard } from "../presenters/http/guards/jwt.guard";
import { APP_GUARD } from "@nestjs/core";
import { TOKENS } from "src/shared/types";
import { BcryptPasswordHasher } from "src/shared/security/bcrypt-hasher.adapter";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || "supersecret",
            signOptions: { expiresIn: "1h" },
        }),
        
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtAdapter,
        DrizzleAuthUserAdapter,
        { provide: APP_GUARD, useClass: JwtGuard },
        { provide: TOKENS.IJwtAdapter, useClass: JwtAdapter },
        { provide: TOKENS.IAuthUserRepository, useExisting: DrizzleAuthUserAdapter },
        { provide: TOKENS.IPasswordHasher, useClass: BcryptPasswordHasher },
    ],
})
export class AuthModule { }
