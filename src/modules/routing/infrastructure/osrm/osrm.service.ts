import { Injectable } from "@nestjs/common";
import { IOsrmAdapter } from "../../domain/ports/osrm.port";
import { Coordinates } from "../../domain/types/coordinates.type";
import { OsrmRouteResponse } from "./types/osrm-api.types";
import { RouteResult } from "../../domain/types/route-result.type";
import { BadRequestError } from "src/shared/errors/domain-errors";
import { ExceptionEnum } from "src/shared/enums/exception.enum";

@Injectable()
export class OsrmService implements IOsrmAdapter {
    private readonly baseUrl = process.env.OSRM_BASE_URL;

    async route(from: Coordinates, to: Coordinates, steps?: boolean): Promise<RouteResult> {
        const coordinates = `${from.lon},${from.lat};${to.lon},${to.lat}`;
        const url = `${this.baseUrl}/route/v1/driving/${coordinates}?steps=${steps ?? false}&overview=simplified`;

        const result: OsrmRouteResponse = await this.request(url, {
            method: "GET"
        });
        const route = result?.routes[0]
        if (!route) {
            throw new BadRequestError(ExceptionEnum.ROUTING_FAILED);
        }
        return {
            distance: route.distance,
            duration: route.duration,
            geometry: route.geometry
        }
    }

    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new BadRequestError(ExceptionEnum.ROUTING_FAILED);
        }
        return response.json() as Promise<T>;
    }
}