import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import md5 from 'md5';

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class User {
  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('password').set(function (pwd: string) {
  const hashed = md5(pwd);
  this.set(hashed);
});
