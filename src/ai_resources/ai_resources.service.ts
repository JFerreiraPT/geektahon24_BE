import {
  BedrockRuntimeClient,
  ConversationRole,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiResourcesService {
  async testCall() {
    const client = new BedrockRuntimeClient({ region: 'us-east-1' });

    const modelId = 'amazon.titan-text-lite-v1';

    const userMessage = "What is 'rubber duck debugging'";
    const conversation = [
      {
        role: ConversationRole.USER,
        content: [{ text: userMessage }],
      },
    ];

    const response = await client.send(
      new ConverseCommand({ modelId, messages: conversation }),
    );

    const responseText = response.output.message.content[0].text;
    console.log(responseText);
  }
}
