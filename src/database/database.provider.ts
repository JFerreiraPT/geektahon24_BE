import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DATABASE_URL, {
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
        authSource: 'admin',
      }),
  },
];
