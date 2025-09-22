import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from '../domain/user.repository';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import * as bcrypt from "bcrypt";
import { TOKENS, NotFoundError, ValidationError } from 'src/shared/types';

@Injectable()
export class UserService {
    constructor(
        @Inject(TOKENS.IUserRepository) private readonly userRepo: IUserRepository
    ) { }

    async updatePassword(userId: number, { oldPassword, newPassword }: UpdatePasswordDto) {
        const user = await this.userRepo.findById(userId)
        if (!user) throw new NotFoundError('User not found')
        if (oldPassword === newPassword) {
            throw new ValidationError("Passwords are same")
        }
        const isValid = await bcrypt.compare(oldPassword, user.password)
        if (isValid) {
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            const result = await this.userRepo.updatePassword(userId, hashedPassword)
            return result
        } else {
            throw new ValidationError("Invalid old password")
        }
    }
}
