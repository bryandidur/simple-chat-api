import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUser, UpdateUser } from './user.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  public constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}

  public async find(): Promise<UserDocument[]> {
    return await this.model.find().exec();
  }

  public async findOne(id: string): Promise<UserDocument> {
    return await this.model.findById(id).exec();
  }

  public async create(data: CreateUser): Promise<UserDocument> {
    return await this.model.create<Omit<UserDocument, 'createdAt' | 'updatedAt'>>({
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: bcrypt.hashSync(data.password, 10),
    });
  }

  public async update(user: UserDocument, data: UpdateUser): Promise<UserDocument> {
    const password = data.password ? bcrypt.hashSync(data.password, 10) : user.password;

    return await this.model.findByIdAndUpdate(user._id, {
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password,
    }, {new: true});
  }
}
