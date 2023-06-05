import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { ConfigModule } from '@nestjs/config';
import { OpenAiController } from './openai.controller';

@Module({
  imports: [ConfigModule],
  providers: [OpenAiService],
  controllers: [OpenAiController],
})
export class OpenAiModule {}
