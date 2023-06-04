import { Body, Controller, Param, Post } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller()
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post()
  sendMessage(@Param('id') userId: string, @Body() body: SendMessageDto) {}
}
