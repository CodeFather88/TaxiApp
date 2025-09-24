import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../application/user.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from 'src/shared/decorators';
import { type IJwtUser } from 'src/shared/types';
import { UpdatePasswordCommand } from '../../application/commands/update-password.command';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('set-password')
  async updatePassword(@Body() body: UpdatePasswordDto, @User() user: IJwtUser): Promise<boolean> {
    const result = await this.userService.updatePassword(user.id, body as UpdatePasswordCommand);
    return result;
  }
}
