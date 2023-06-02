// import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import md5 from 'md5';
import { Document } from 'mongoose';

// @Schema({
//   // toJSON: { virtuals: true },
//   toObject: { virtuals: true },
// })
export class User extends Document {
  // @Prop({ isRequired: true })
  username: string;

  // @Prop({ isRequired: true })
  hashedPassword: string;

  // @Prop({ isRequired: true })
  email: string;

  // @Prop({ isRequired: true })
  name: string;

  // @Prop()
  address: string;

  set password(pwd: string) {
    const hashed = md5(pwd);
    this.set({ hashedPassword: hashed });
  }
  get password(): string {
    return this.hashedPassword;
  }

  comparePassword(pwd: string): boolean {
    return this.hashedPassword === md5(pwd);
  }
}

// export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('password')
//   .set(function (pwd: string) {
//     const hashed = md5(pwd);
//     this.set({ hashedPassword: hashed });
//   })
//   .get(function () {
//     return this.hashedPassword;
//   });

// UserSchema.method('comparePassword', function (pwd: string): boolean {
//   return this.hashedPassword === md5(pwd);
// });
