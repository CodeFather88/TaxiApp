import { Coordinates } from "src/modules/routing/domain/types/coordinates.type";

export class RouteCommand {
    from: Coordinates;
    to: Coordinates;
}