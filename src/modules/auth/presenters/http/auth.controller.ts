import { Controller, Post, Body } from "@nestjs/common";
import { Public } from "src/shared/decorators";
import { AuthService } from "../../application/auth.service";
import { LoginQueryDto } from "./dto/query/login.dto";
import { RegisterQueryDto } from "./dto/query/register.dto";
import { RegisterCommand } from "../../application/commands/register.command";
import { LoginCommand } from "../../application/commands/login.command";
import { RegisterResponseDto } from "./dto/response/register.dto";
import { LoginResponseDto } from "./dto/response/login.response.dto";

@Public()
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("register")
    async register(@Body() body: RegisterQueryDto): Promise<RegisterResponseDto> {
        const user = await this.authService.register(body as RegisterCommand);
        return {
            id: user.id,
            phoneNumber: user.phoneNumber,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }

    @Post("login")
    async login(@Body() body: LoginQueryDto): Promise<LoginResponseDto> {
        return this.authService.login(body as LoginCommand);
    }
}
