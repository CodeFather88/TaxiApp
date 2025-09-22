import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './interface/user.controller';
import { DrizzleUsersAdapter } from './adapters/drizzle-users.adapter';
import { TOKENS } from 'src/shared/types';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    DrizzleUsersAdapter,
    { provide: TOKENS.IUserRepository, useClass: DrizzleUsersAdapter },
  ],
  exports: [
    { provide: TOKENS.IUserRepository, useExisting: DrizzleUsersAdapter },
    DrizzleUsersAdapter,
  ]
})
export class UserModule { }
