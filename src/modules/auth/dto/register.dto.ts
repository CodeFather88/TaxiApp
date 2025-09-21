import { IsString, IsOptional, IsEnum, MinLength, Matches } from 'class-validator';
import { UserRole } from 'src/modules/users/domain/user.types';

export class RegisterDto {
    @IsString()
    phoneNumber: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole;
}
