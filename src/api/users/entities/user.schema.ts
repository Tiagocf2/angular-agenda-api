import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ isRequired: true })
  username: string;

  @Prop({ isRequired: true })
  password: string;

  @Prop({ isRequired: true })
  email: string;

  @Prop({ isRequired: true })
  name: string;

  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
