import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type IUserRepository } from '../domain/user.repository';
import { DrizzleUsersAdapter } from '../adapters/drizzle-users.adapter';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { IdDto } from 'src/shared/dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @Inject(DrizzleUsersAdapter) private readonly userRepo: IUserRepository
    ) { }

    async updatePassword(userId: number, { oldPassword, newPassword }: UpdatePasswordDto) {
        const user = await this.userRepo.findById(userId)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        if (oldPassword === newPassword) {
            throw new BadRequestException("Passwords are same")
        }
        const isValid = await bcrypt.compare(oldPassword, user.password)
        if (isValid) {
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            const result = await this.userRepo.updatePassword(userId, hashedPassword)
            return result
        } else {
            throw new BadRequestException("Invalid old password")
        }
    }
}
