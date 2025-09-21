import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { type IJwtAdapter } from "../domain/jwt.adapter.interface";

@Injectable()
export class JwtAdapter implements IJwtAdapter {
    constructor(private jwtService: JwtService) { }

    async sign(payload: object): Promise<string> {
        return this.jwtService.signAsync(payload);
    }

    async verify(token: string) {
        return this.jwtService.verifyAsync(token);
    }
}
