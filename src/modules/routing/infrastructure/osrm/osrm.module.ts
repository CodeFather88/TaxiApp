import { Module } from "@nestjs/common";
import { OsrmService } from "./osrm.service";
import { OSRM_PORT } from "../../domain/ports/osrm.port";

@Module({
    providers: [
        { provide: OSRM_PORT, useClass: OsrmService }
    ],
    exports: [OSRM_PORT]
})
export class OsrmModule { }