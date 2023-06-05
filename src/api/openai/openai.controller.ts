import { Controller, Get } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('openai')
export class OpenAiController {
  constructor(private openaiService: OpenAiService) {}

  @Get('models')
  listModels() {
    return this.openaiService.listModels();
  }

  @Get('ping')
  testOpenai() {
    return this.openaiService.requestPrompt(
      // { text: 'say pong' },
      {
        text: 'criar uma nova tarefa',
      },
      // { max_tokens: 3 },
    );
  }
}
