import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
const md5 = require('md5');

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

  comparePassword(pwd: string) {
    return this.password === md5(pwd);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
