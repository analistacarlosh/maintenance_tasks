import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  @MessagePattern({ cmd: 'newTaskPerformed' })
  getNewTaskPerformed(message: string): string {
    console.log(`getNewTaskPerformed :: ${message}`);
    return message;
  }
}
