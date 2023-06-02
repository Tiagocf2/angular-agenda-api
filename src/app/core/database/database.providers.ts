import * as mongoose from 'mongoose';
import { DATABASE_URI } from '../utils/constants';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      console.info('Mongoose URI:', DATABASE_URI);
      return mongoose.connect(DATABASE_URI);
    },
  },
];
