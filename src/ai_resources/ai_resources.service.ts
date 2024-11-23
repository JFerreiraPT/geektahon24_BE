import {
  BedrockRuntimeClient,
  ConversationRole,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { Injectable } from '@nestjs/common';
import { PROMPT_INPUTS } from './prompts.provider';
import { ChatService } from 'src/chat/chat.service';
import { InputService } from 'src/input/input.service';

@Injectable()
export class AiResourcesService {
  private readonly client: BedrockRuntimeClient;
  private readonly modelId: string;

  constructor(
    private readonly chatService: ChatService,
    private readonly inputService: InputService,
  ) {
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

  async getResources(inputs: string[], chatId: string): Promise<string> {
    console.log('inputIds', inputs);
    const inputsResults = await this.inputService.getInputsByIds(inputs);
    const chatResult = await this.chatService.getMessagesFromChat(chatId);

    const formattedInputs = inputsResults
      ?.map((input) => {
        return `Input: 
        - Text: ${input.text || 'N/A'}
        - Type: ${input.type || 'N/A'}
        - File URL: ${input.fileUrl || 'N/A'}
        - File Name: ${input.fileName || 'N/A'}
        - File Size: ${input.fileSize || 'N/A'}
        - Timestamp: ${input.timestamp?.toISOString() || 'N/A'}`;
      })
      .join('\n\n');

    const formattedMessages = chatResult
      ?.map((message) => {
        return `Message: 
        - Sender: ${message.sender}
        - Message: ${message.message}
        - Type: ${message.type}
        - File URL: ${message.fileUrl || 'N/A'}
        - File Name: ${message.fileName || 'N/A'}
        - File Size: ${message.fileSize || 'N/A'}
        - Timestamp: ${message.timestamp.toISOString()}`;
      })
      .join('\n\n');

    const compiledString = `Inputs:\n${formattedInputs}\n\nChat Messages:\n${formattedMessages}`;
    console.log(inputsResults);
    return compiledString;
  }

  async getActionPoints(inputs: string[], chatId: string) {
    const formattedContext = await this.getResources(inputs, chatId);
    const actionPointPrompt = PROMPT_INPUTS.ACTION_POINT.replace(
      '[Insert Context Here]',
      formattedContext,
    );

    return await this.getResponseFromModel(actionPointPrompt);
  }

  async getSummary(inputs: string[], chatId: string) {
    const formattedContext = await this.getResources(inputs, chatId);
    const summarizePrompt = PROMPT_INPUTS.SUMMARIZE.replace(
      '[Insert Context Here]',
      formattedContext,
    );

    return await this.getResponseFromModel(summarizePrompt);
  }

  async generateDocumentation(inputs: string[], chatId: string) {
    const formattedContext = await this.getResources(inputs, chatId);
    const documentationPrompt = PROMPT_INPUTS.DOCUMENTATION.replace(
      '[Insert Context Here]',
      formattedContext,
    );

    return await this.getResponseFromModel(documentationPrompt);
  }
}
