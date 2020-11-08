import { Controller, Get, Param, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Controller('chat')
export class ChatController {
  public constructor(@InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>) {}

  @Get('/messages/:userName')
  public async getMessages(
    @Param() params: {userName: string},
    @Query() query: {authUserName: string}
  ): Promise<MessageDocument[]> {
    const messages: MessageDocument[] = await this.messageModel.find({
      $or: [
        {threadKey: `${query.authUserName}/${params.userName}`},
        {threadKey: `${params.userName}/${query.authUserName}`},
      ],
    });

    return messages;
  }
}
