import { ApiProperty } from "@nestjs/swagger";

export class RouteResponseDto {
    @ApiProperty({ type: Number })
    distance: number

    @ApiProperty({ type: Number })
    duration: number

    @ApiProperty({ type: String })
    geometry: string
}