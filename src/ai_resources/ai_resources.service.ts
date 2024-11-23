import {
  BedrockRuntimeClient,
  ConversationRole,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { Injectable } from '@nestjs/common';
import { PROMPT_INPUTS } from './prompts.provider';
import { ChatService } from 'src/chat/chat.service';
import { InputService } from 'src/input/input.service';
import { FileRetrieveService } from 'src/file-retrieve/file-retrieve.service';

@Injectable()
export class AiResourcesService {
  private readonly client: BedrockRuntimeClient;
  private readonly modelId: string;

  constructor(
    private readonly chatService: ChatService,
    private readonly inputService: InputService,
    private readonly fileRetrieveService: FileRetrieveService,
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
    const inputsResults = await this.inputService.getInputsByIds(inputs);
    const chatResult = await this.chatService.getMessagesFromChat(chatId);

    const safeInputsResults = Array.isArray(inputsResults) ? inputsResults : [];
    const safeChatResult = Array.isArray(chatResult) ? chatResult : [];

    const formattedInputs = await Promise.all(
      safeInputsResults.map(async (input) => {
        let fileData = 'N/A';
        if (input.type === 'file' && input.fileUrl) {
          fileData = await this.fileRetrieveService.getFileContent(
            'confused',
            input.fileUrl,
          );
        }
        return `Input: 
    - Text: ${input.text || 'N/A'}
    - Type: ${input.type || 'N/A'}
    - File URL: ${input.fileUrl || 'N/A'}
    - File Name: ${input.fileName || 'N/A'}
    - File Size: ${input.fileSize || 'N/A'}
    - Timestamp: ${input.timestamp?.toISOString() || 'N/A'}
    - File Data: ${fileData}`;
      }),
    );

    const formattedMessages = await Promise.all(
      safeChatResult.map(async (message) => {
        let fileData = 'N/A';
        if (message.type === 'file' && message.fileUrl) {
          fileData = await this.fileRetrieveService.getFileContent(
            'confused',
            message.fileUrl,
          );
        }
        return `Message: 
    - Sender: ${message.sender}
    - Message: ${message.message}
    - Type: ${message.type}
    - File URL: ${message.fileUrl || 'N/A'}
    - File Name: ${message.fileName || 'N/A'}
    - File Size: ${message.fileSize || 'N/A'}
    - Timestamp: ${message.timestamp.toISOString()}
    - File Data: ${fileData}`;
      }),
    );

    const compiledString = `Inputs:\n${formattedInputs.join('\n\n')}\n\nChat Messages:\n${formattedMessages.join('\n\n')}`;

    return compiledString;
  }

  async getActionPoints(boardId: string, inputs: string[], chatId: string) {
    const formattedContext = await this.getResources(inputs, chatId);
    const actionPointPrompt = PROMPT_INPUTS.ACTION_POINT.replace(
      '[Insert Context Here]',
      formattedContext,
    );

    const response = await this.getResponseFromModel(actionPointPrompt);
    const createdResponse = await this.inputService.storeInput(
      boardId,
      response,
      'text',
    );
    return createdResponse;
  }

  async getSummary(boardId: string, inputs: string[], chatId: string) {
    const formattedContext = await this.getResources(inputs, chatId);
    const summarizePrompt = PROMPT_INPUTS.SUMMARIZE.replace(
      '[Insert Context Here]',
      formattedContext,
    );

    const response = await this.getResponseFromModel(summarizePrompt);
    const createdResponse = await this.inputService.storeInput(
      boardId,
      response,
      'text',
    );
    return createdResponse;
  }

  async generateDocumentation(
    boardId: string,
    inputs: string[],
    chatId: string,
  ) {
    const formattedContext = await this.getResources(inputs, chatId);
    const documentationPrompt = PROMPT_INPUTS.DOCUMENTATION.replace(
      '[Insert Context Here]',
      formattedContext,
    );

    const response = await this.getResponseFromModel(documentationPrompt);

    const createdResponse = await this.inputService.storeInput(
      boardId,
      response,
      'text',
    );
    return createdResponse;
  }

  async generateTasks(boardId: string, inputs: string[], chatId: string) {
    const formattedContext = await this.getResources(inputs, chatId);
    const documentationPrompt = PROMPT_INPUTS.TASK_LIST.replace(
      '[Insert Context Here]',
      formattedContext,
    );

    const response = await this.getResponseFromModel(documentationPrompt);

    const tasks = JSON.parse(response);

    // Step 4: Store each task as an individual input
    const createdResponses = [];
    for (const task of tasks) {
      const createdResponse = await this.inputService.storeInput(
        boardId,
        task['task'],
        'text',
      );
      createdResponses.push(createdResponse);
    }

    return createdResponses;
  }

  async generateEmails(boardId: string, inputs: string[], chatId: string) {
    const formattedContext = await this.getResources(inputs, chatId);
    const documentationPrompt = PROMPT_INPUTS.GENERATE_EMAIL.replace(
      '[Insert Context Here]',
      formattedContext,
    );

    const response = await this.getResponseFromModel(documentationPrompt);

    const createdResponse = await this.inputService.storeInput(
      boardId,
      response,
      'text',
    );
    return createdResponse;
  }
}
