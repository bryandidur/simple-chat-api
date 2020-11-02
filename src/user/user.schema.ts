import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
class User {
  @Prop({required: true, minlength: 2, maxlength: 100})
  firstName: string;

  @Prop({required: true, minlength: 2, maxlength: 100})
  lastName: string;

  @Prop({required: true, minlength: 5, maxlength: 200})
  fullName: string;

  @Prop({required: true, minlength: 2, maxlength: 100, unique: true})
  email: string;

  @Prop({required: true, minlength: 2, maxlength: 100})
  password: string;

  @Prop({required: false})
  createdAt: Date;

  @Prop({required: false})
  updatedAt: Date;
}

type UserDocument = User & Document;

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
  const data = this.toObject();

  delete data.password;

  return data;
});

export {
  User,
  UserDocument,
  UserSchema,
};
