import { Connection } from 'mongoose';
import { ChatSchema, MessageSchema, UserSchema } from './schema/chat.schema';

export const databaseProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'MESSAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Message', MessageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'CHAT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Chat', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
