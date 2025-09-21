import { IsInt, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class IdDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsPositive()
    id: number;
}
