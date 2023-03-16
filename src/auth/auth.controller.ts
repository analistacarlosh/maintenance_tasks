import {
  Controller,
  Request,
  Post,
  UseGuards,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConstantStrings } from '../utils/constants/strings.constants';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login_response.dto';
import { LoginAuthGuard } from './guard/login-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('authenticaion')
  @UseGuards(LoginAuthGuard)
  @Post('v1/auth/login')
  @ApiOkResponse({
    description: ConstantStrings.swaggerTaskDescription200Response,
    type: LoginResponseDto,
    isArray: false,
  })
  @ApiResponse({
    status: 401,
    description: ConstantStrings.swaggerDescription400BadRequest,
  })
  async login(@Body() _loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user).catch((_error: unknown) => {
      throw new BadRequestException('Error to complete the login.');
    });
  }
}
