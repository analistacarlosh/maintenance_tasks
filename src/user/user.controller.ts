import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  @EventPattern('new-task-performed-notification')
  async handleNewTaskPerformed(data: Record<string, unknown>) {
    console.log('new-task-performed-notification', data);
  }
}
