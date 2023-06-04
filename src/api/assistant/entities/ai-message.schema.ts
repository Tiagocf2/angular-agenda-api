import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AIMessageStatus } from '../enums/ai-message-status.enum';

@Schema()
export class AIMessage {
  @Prop({ isRequired: true })
  message: string;

  @Prop()
  response: string;

  @Prop({ type: String, enum: AIMessageStatus, default: AIMessageStatus.SENT })
  status: AIMessageStatus;
}

export type AIMessageDocument = Document & AIMessage;
export const AIMessageSchema = SchemaFactory.createForClass(AIMessage);
