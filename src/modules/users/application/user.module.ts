import { Module } from '@nestjs/common';
import { TOKENS } from 'src/shared/types';
import { BcryptPasswordHasher } from 'src/shared/security/bcrypt-hasher.adapter';
import { UserService } from './user.service';
import { DrizzleUsersAdapter } from '../infrastructure/data/drizzle-users.adapter';
import { UserController } from '../presenters/http/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    DrizzleUsersAdapter,
    { provide: TOKENS.IUserRepository, useClass: DrizzleUsersAdapter },
    { provide: TOKENS.IPasswordHasher, useClass: BcryptPasswordHasher },
  ],
  exports: [
    { provide: TOKENS.IUserRepository, useExisting: DrizzleUsersAdapter },
  ]
})
export class UserModule { }
