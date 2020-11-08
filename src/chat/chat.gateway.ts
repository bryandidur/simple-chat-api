import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private sockets: {[userName: string]: Socket} = {};

  @SubscribeMessage('chat/send-message')
  public handleEvent(
    @MessageBody() data: {toUser: string; text: string},
    @ConnectedSocket() socket: Socket,
  ) {
    const authUserName = this.getAuthUserNameFromSocket(socket);
    const toUserSocket = this.sockets[data.toUser];

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
    return socket.handshake.query.userName;
  }
}
