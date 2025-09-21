import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Pool } from 'pg'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
export const DRIZZLE = Symbol("drizzle-connection")
import * as schema from './schema/users'

@Global()
@Module({

    imports: [ConfigModule.forRoot()],
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const dbUrl = configService.getOrThrow<string>('DATABASE_URL')
                const pool = new Pool({
                    connectionString: dbUrl,
                })
                return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>
            }
        }
    ],

    exports: [DRIZZLE]

})

export class DrizzleModule { }