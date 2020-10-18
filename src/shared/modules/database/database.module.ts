import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongooseTimestamp from 'mongoose-timestamp';
import config from './database.config';

@Module({
  imports: [
    ConfigModule.forFeature(config),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.uri'),
        connectionFactory: (connection) => {
          connection.plugin(mongooseTimestamp);

          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
