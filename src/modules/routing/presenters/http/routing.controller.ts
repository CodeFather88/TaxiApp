import { Controller, Get, Query } from "@nestjs/common";
import { RoutingService } from "../../application/routing.service";
import { Coordinates } from "../../domain/types/coordinates.type";
import { RouteQueryDto } from "./dto/query/route.query.dto";
import { RouteCommand } from "../../application/commands/route.command";
import { RouteResponseDto } from "./dto/response/route.response.dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/shared/decorators";

@ApiTags('Routing')
@Controller('routing')
@Public()
export class RoutingController {
    constructor(private readonly routingService: RoutingService) { }

    @Get('route')
    @ApiOkResponse({ type: RouteResponseDto })
    async getRoute(@Query() query: RouteQueryDto): Promise<RouteResponseDto> {
        const from: Coordinates = { lat: query.fromLatitude, lon: query.fromLongitude };
        const to: Coordinates = { lat: query.toLatitude, lon: query.toLongitude };
        const result = await this.routingService.getRoute({ from, to } as RouteCommand);
        return {
            distance: result.distance,
            duration: result.duration,
            geometry: result.geometry || ''
        }
    }
}