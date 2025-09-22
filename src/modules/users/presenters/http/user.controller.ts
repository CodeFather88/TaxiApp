import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../application/user.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from 'src/shared/decorators';
import { type IUser } from 'src/shared/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('set-password')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @User() user: IUser) {
    return this.userService.updatePassword(user.id, updatePasswordDto);
  }
}
