import { Inject, Injectable } from '@nestjs/common';
import { type IUserRepository } from '../domain/ports/user.repository.port';
import { UpdatePasswordDto } from '../presenters/http/dto/update-password.dto';
import { type IPasswordHasher } from "src/shared/security/password-hasher.port";
import { TOKENS, NotFoundError, ValidationError } from 'src/shared/types';

@Injectable()
export class UserService {
    constructor(
        @Inject(TOKENS.IUserRepository) private readonly userRepo: IUserRepository,
        @Inject(TOKENS.IPasswordHasher) private readonly passwordHasher: IPasswordHasher,
    ) { }

    async updatePassword(userId: number, { oldPassword, newPassword }: UpdatePasswordDto) {
        const user = await this.userRepo.findById(userId)
        if (!user) throw new NotFoundError('User not found')
        if (oldPassword === newPassword) {
            throw new ValidationError("Passwords are same")
        }
        const isValid = await this.passwordHasher.compare(oldPassword, user.password)
        if (isValid) {
            const hashedPassword = await this.passwordHasher.hash(newPassword)
            const result = await this.userRepo.updatePassword(userId, hashedPassword)
            return result
        } else {
            throw new ValidationError("Invalid old password")
        }
    }
}
