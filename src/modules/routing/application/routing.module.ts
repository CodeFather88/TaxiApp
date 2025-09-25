import { Module } from "@nestjs/common";
import { OsrmModule } from "../infrastructure/osrm/osrm.module";
import { RoutingService } from "./routing.service";
import { RoutingController } from "../presenters/http/routing.controller";

@Module({
    imports: [OsrmModule],
    controllers: [RoutingController],
    providers: [RoutingService]
})
export class RoutingModule { }