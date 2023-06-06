import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('openai')
export class OpenAiController {
  constructor(private openaiService: OpenAiService) {}

  @Get('models')
  listModels() {
    return this.openaiService.listModels();
  }

  @Post()
  chat(@Body() body: { text: string; name: string }) {
    return this.openaiService.requestPrompt(body);
  }
}
