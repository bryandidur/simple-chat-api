import { InjectModel } from '@nestjs/mongoose';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { Message, MessageDocument } from './message.schema';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  public constructor(@InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>) {}

  @WebSocketServer()
  private server: Server;

  private sockets: {[userName: string]: Socket} = {};

  @SubscribeMessage('chat/send-message')
  public async handleEvent(
    @MessageBody() data: {toUser: string; text: string},
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const authUserName = this.getAuthUserNameFromSocket(socket);
    const toUserSocket = this.sockets[data.toUser];

    await this.messageModel.create({
      threadKey: `${authUserName}/${data.toUser}`,
      fromUser: authUserName,
      toUser: data.toUser,
      text: data.text,
    });

    if (toUserSocket) {
      console.log(`Sending message from user (${authUserName}) to user (${data.toUser})`);

      toUserSocket.emit('chat/received-message', {userName: authUserName, text: data.text});
    }
  }

  public handleConnection(socket: Socket): void {
    const authUserName = this.getAuthUserNameFromSocket(socket);

    this.sockets[authUserName] = socket;

    this.server.emit('chat/active-users', Object.keys(this.sockets));

    console.log('User connected:', authUserName);
  }

  public handleDisconnect(socket: Socket): void {
    const authUserName = this.getAuthUserNameFromSocket(socket);

    delete this.sockets[authUserName];

    this.server.emit('chat/active-users', Object.keys(this.sockets));

    console.log('User disconnected:', authUserName);
  }

  private getAuthUserNameFromSocket(socket: Socket): string {
    return socket.handshake.query.authUserName;
  }
}
