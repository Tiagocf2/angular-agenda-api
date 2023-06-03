import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';

const staticOptions: MongooseModuleFactoryOptions = {};

const MongooseConfiguration: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    console.info('Mongoose URI:', configService.get<string>('DATABASE_URI'));
    return {
      ...staticOptions,
      uri: configService.get<string>('DATABASE_URI'),
    };
  },
  inject: [ConfigService],
};

export default MongooseConfiguration;
