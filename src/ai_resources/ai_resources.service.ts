import {
  BedrockRuntimeClient,
  ConversationRole,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiResourcesService {
  async testCall() {
    const client = new BedrockRuntimeClient({ region: 'us-west-2' });

    const modelId = 'anthropic.claude-3-sonnet-20240229-v1:0';

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
    return responseText;
  }
}
