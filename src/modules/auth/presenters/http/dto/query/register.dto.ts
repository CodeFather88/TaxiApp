import { IsString, IsOptional, IsEnum, MinLength } from 'class-validator';
import { UserRole } from 'src/modules/users/domain/types/user.types';

export class RegisterQueryDto {
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
