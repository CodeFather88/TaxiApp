import { Inject, Injectable } from "@nestjs/common";
import { type IOsrmAdapter, OSRM_PORT } from "../domain/ports/osrm.port";
import { RouteResult } from "../domain/types/route-result.type";
import { RouteCommand } from "./commands/route.command";
import { ValidationError } from "src/shared/errors/domain-errors";
import { ExceptionEnum } from "src/shared/enums/exception.enum";
import { Coordinates } from "../domain/types/coordinates.type";

@Injectable()
export class RoutingService {
    constructor(@Inject(OSRM_PORT) private readonly osrm: IOsrmAdapter) { }

    async getRoute({ from, to }: RouteCommand): Promise<RouteResult> {
        this.validateCoordinates(from);
        this.validateCoordinates(to);
        return this.osrm.route(from, to, );
    }

    private validateCoordinates(coordinates: Coordinates): void {
        if (coordinates.lat < -90 || coordinates.lat > 90 || coordinates.lon < -180 || coordinates.lon > 180) {
            throw new ValidationError(ExceptionEnum.INVALID_COORDINATES);
        }
    }
}