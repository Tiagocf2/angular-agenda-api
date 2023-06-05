import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';

import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { AssistantModule } from './api/assistant/assistant.module';
import { TasksModule } from './api/tasks/tasks.module';

import MongooseConfiguration from 'src/core/config/mongoose.config';
import { OpenAiModule } from './api/openai/openai.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TasksModule,
    OpenAiModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(MongooseConfiguration),
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'users',
        module: UsersModule,
        children: [
          {
            path: ':id',
            children: [
              {
                path: 'chat',
                module: AssistantModule,
              },
              {
                path: 'tasks',
                module: TasksModule,
              },
            ],
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
