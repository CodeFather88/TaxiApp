import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "../application/auth.service";
import { UserEntity } from "../../users/domain/user.entity";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { Public } from "src/shared/decorators";

@Public()
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("register")
    async register(@Body() body: RegisterDto): Promise<UserEntity> {
        return this.authService.register(body);
    }

    @Post("login")
    async login(@Body() body: LoginDto) {
        return this.authService.login(body.phoneNumber, body.password);
    }
}
