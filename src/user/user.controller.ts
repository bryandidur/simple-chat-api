import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MongoIdDto } from '../shared/dto';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  public constructor(private readonly service: UserService) {}

  @Get()
  public async find(): Promise<UserDocument[]> {
    return await this.service.find();
  }

  @Get(':id')
  public async findOne(@Param() params: MongoIdDto): Promise<UserDocument> {
    return await this.service.findOne(params.id);
  }

  @Post()
  public async create(@Body() data: CreateUserDto): Promise<UserDocument> {
    return await this.service.create(data);
  }

  @Put(':id')
  public async update(@Param() params: MongoIdDto, @Body() data: UpdateUserDto): Promise<UserDocument> {
    const user: any = await this.service.findOne(params.id);

    if (!user) {
      throw new NotFoundException();
    }

    return await this.service.update(user, data);
  }
}
