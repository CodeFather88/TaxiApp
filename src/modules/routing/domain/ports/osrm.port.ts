import { Coordinates } from "../types/coordinates.type";
import { RouteResult } from "../types/route-result.type";

export interface IOsrmAdapter {
    route(from: Coordinates, to: Coordinates, steps?: boolean): Promise<RouteResult>;
}

export const OSRM_PORT = Symbol('OSRM_PORT');