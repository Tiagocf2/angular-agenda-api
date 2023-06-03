import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';

import MongooseConfiguration from 'src/core/config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(MongooseConfiguration),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
