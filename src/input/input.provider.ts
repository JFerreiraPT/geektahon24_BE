import { Connection } from 'mongoose';
import { InputSchema } from './schema/input.schema';

export const ChatProviders = [
  {
    provide: 'INPUT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Input', InputSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
