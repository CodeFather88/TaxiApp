import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class RouteQueryDto {
    @ApiProperty({ type: Number, example: 52.517037 })
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    fromLatitude: number;

    @ApiProperty({ type: Number, example: 13.388860 })
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    fromLongitude: number;

    @ApiProperty({ type: Number, example: 52.496891 })
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    toLatitude: number;

    @ApiProperty({ type: Number, example: 13.385983 })
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    toLongitude: number;
}