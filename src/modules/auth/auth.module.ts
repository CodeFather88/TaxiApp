import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAdapter } from "./adapters/jwt.adapter";
import { AuthService } from "./application/auth.service";
import { AuthController } from "./interface/auth.controller";
import { DrizzleUsersAdapter } from "../users/adapters/drizzle-users.adapter";
import { UserModule } from "../users/user.module";
import { JwtGuard } from "./guards/jwt.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || "supersecret",
            signOptions: { expiresIn: "1h" },
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtAdapter,
        { provide: APP_GUARD, useClass: JwtGuard },
        { provide: "IJwtAdapter", useClass: JwtAdapter },
        { provide: "IAuthUserRepository", useExisting: DrizzleUsersAdapter }
    ],
})
export class AuthModule { }
