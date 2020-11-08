import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
class Message {
  @Prop({required: true})
  threadKey: string;

  @Prop({required: true})
  fromUser: string;

  @Prop({required: true})
  toUser: string;

  @Prop({required: true})
  text: string;
}

type MessageDocument = Message & Document;

const MessageSchema = SchemaFactory.createForClass(Message);

export {
  Message,
  MessageDocument,
  MessageSchema,
};
