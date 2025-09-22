import { IsString } from 'class-validator';

export class LoginQueryDto {
  @IsString()
  phoneNumber: string;

  @IsString()
  password: string;
}
