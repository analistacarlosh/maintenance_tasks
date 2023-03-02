import {
  Controller,
  Request,
  Post,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthGuard } from './guard/login-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LoginAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user).catch((_error: unknown) => {
      throw new BadRequestException('Error to complete the login.');
    });
  }
}
