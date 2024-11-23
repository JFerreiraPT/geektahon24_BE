import {
  BedrockRuntimeClient,
  ConversationRole,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { Injectable } from '@nestjs/common';
import { PROMPT_INPUTS } from './prompts.provider';

@Injectable()
export class AiResourcesService {
  private readonly client: BedrockRuntimeClient;
  private readonly modelId: string;

  constructor() {
    this.client = new BedrockRuntimeClient({ region: 'us-west-2' });
    this.modelId = 'anthropic.claude-3-sonnet-20240229-v1:0';
  }

  private async getResponseFromModel(prompt: string) {
    const conversation = [
      {
        role: ConversationRole.USER,
        content: [{ text: prompt }],
      },
    ];

    const response = await this.client.send(
      new ConverseCommand({ modelId: this.modelId, messages: conversation }),
    );

    return response.output.message.content[0].text;
  }

  async getActionPoints(text: string) {
    const actionPointPrompt = PROMPT_INPUTS.ACTION_POINT.replace(
      '[Insert Context Here]',
      text,
    );

    return await this.getResponseFromModel(actionPointPrompt);
  }

  async getSummary(text: string) {
    const summarizePrompt = PROMPT_INPUTS.SUMMARIZE.replace(
      '[Insert Context Here]',
      text,
    );

    return await this.getResponseFromModel(summarizePrompt);
  }

  async generateDocumentation(text: string) {
    const documentationPrompt = PROMPT_INPUTS.DOCUMENTATION.replace(
      '[Insert Context Here]',
      text,
    );

    return await this.getResponseFromModel(documentationPrompt);
  }
}
