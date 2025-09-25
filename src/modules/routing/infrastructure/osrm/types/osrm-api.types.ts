export interface OsrmRouteResponse {
    code: string;
    routes: OsrmRoute[];
    waypoints: OsrmWaypoint[];
}

export interface OsrmRoute {
    geometry: string;
    legs: OsrmLeg[];
    distance: number;
    duration: number;
    weight_name: string;
    weight: number;
}

export interface OsrmLeg {
    distance: number;
    duration: number;
    steps: OsrmStep[];
    summary: string;
}

export interface OsrmStep {
    distance: number;
    duration: number;
    geometry: string;
    name: string;
    mode: string;
    maneuver: OsrmManeuver;
}

export interface OsrmManeuver {
    bearing_after: number;
    bearing_before: number;
    location: [number, number];
    type: string;
}

export interface OsrmWaypoint {
    hint: string;
    distance: number;
    name: string;
    location: [number, number];
}