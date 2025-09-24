import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/application/auth.module';
import { DrizzleModule } from './database/drizzle/drizzle.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { UserModule } from './modules/users/application/user.module';
import { HttpErrorRegistry } from './shared/errors/http-error.registry';

@Module({
  imports: [UserModule, AuthModule, DrizzleModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {
  constructor() {
    HttpErrorRegistry.registerDefaults();
  }
}
