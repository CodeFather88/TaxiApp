import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DrizzleModule } from './database/drizzle/drizzle.module';

@Module({
  imports: [UserModule, AuthModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
