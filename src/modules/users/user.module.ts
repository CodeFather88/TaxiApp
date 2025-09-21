import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './interface/user.controller';
import { DrizzleUsersAdapter } from './adapters/drizzle-users.adapter';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    DrizzleUsersAdapter,
    { provide: "IUserRepository", useClass: DrizzleUsersAdapter },
  ],
  exports: [
    { provide: "IUserRepository", useExisting: DrizzleUsersAdapter },
    DrizzleUsersAdapter,
  ]
})
export class UserModule { }
