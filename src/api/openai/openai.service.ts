import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { Environment } from 'src/core/config/environment.config';
import { AiPrompt } from './interfaces/ai-prompt.interface';
import {
  // AI_PROMPT_TEXT_IDENTIFIER,
  AI_PROMPT_USER_MAX_SIZE,
} from './constants/ai-prompt.constants';
import { DEFAULT_MESSAGE_PROMPT } from './ai-prompts';
// import { DEFAULT_PROMPT } from './ai-prompts';

const defaultRequestOptions: CreateCompletionRequest = {
  model: 'gpt-3.5-turbo',
  max_tokens: 30,
  temperature: 1,
  stop: ['.', '?', '!', '\n'],
  // presence_penalty: 1,
};

@Injectable()
export class OpenAiService {
  private openai: OpenAIApi;
  constructor(private configService: ConfigService) {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: configService.get<string>(Environment.OPENAI_API_KEY),
      }),
    );
  }

  async listModels() {
    const response = await this.openai.listModels();
    return response.data.data;
  }

  async requestPrompt(prompt: AiPrompt, options?: { max_tokens?: number }) {
    const formattedPrompt = this.formatInput(prompt);

    try {
      const response = await this.openai.createChatCompletion({
        ...defaultRequestOptions,
        ...(options || {}),
        messages: [
          { role: 'system', content: DEFAULT_MESSAGE_PROMPT },
          {
            role: 'user',
            name: formattedPrompt.name,
            content: formattedPrompt.text,
          },
        ],
      });
      return { text: response.data.choices[0].message.content };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private formatInput(prompt: AiPrompt) {
    let text: string;
    if (prompt.text.length > AI_PROMPT_USER_MAX_SIZE) {
      text = prompt.text.substring(0, AI_PROMPT_USER_MAX_SIZE) + '...\n';
    } else {
      text = prompt.text;
    }
    let name = prompt.name.substring(0, 20).split(' ')[0];
    return { text, name };
  }
}
