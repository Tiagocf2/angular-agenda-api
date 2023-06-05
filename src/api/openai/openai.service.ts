import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { Environment } from 'src/core/config/environment.config';
import { AiPrompt } from './interfaces/ai-prompt.interface';
import { AI_PROMPT_TEXT_IDENTIFIER } from './constants/ai-prompt.constants';
import { DEFAULT_PROMPT } from './ai-prompts';

const defaultRequestOptions: CreateCompletionRequest = {
  model: 'davinci',
  max_tokens: 20,
  temperature: 0,
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
    console.log(formattedPrompt);

    const response = await this.openai.createCompletion({
      ...defaultRequestOptions,
      ...(options || {}),
      prompt: formattedPrompt.text,
    });

    console.log(response.data);
    return response.data.choices[0].text;
  }

  private formatInput(prompt: AiPrompt) {
    let text: string;
    // if (prompt.text.length > AI_PROMPT_USER_MAX_SIZE) {
    //   text = prompt.text.substring(0, AI_PROMPT_USER_MAX_SIZE) + '...\n';
    // } else {
    text = prompt.text;
    // }
    return { text: DEFAULT_PROMPT.replace(AI_PROMPT_TEXT_IDENTIFIER, text) };
  }
}
