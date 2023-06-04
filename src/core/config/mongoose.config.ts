import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';
import { Environment } from './environment.config';

const staticOptions: MongooseModuleFactoryOptions = {};

const MongooseConfiguration: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>(Environment.DATABASE_URI);
    console.info('Mongoose URI:', uri);
    return {
      ...staticOptions,
      uri,
    };
  },
  inject: [ConfigService],
};

export default MongooseConfiguration;
