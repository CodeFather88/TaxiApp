import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UpdatePasswordDto {
    @ApiProperty({ type: String })
    @IsString()
    oldPassword: string
    
    @ApiProperty({ type: String })
    @IsString()
    newPassword: string
}