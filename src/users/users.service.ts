/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepo: Repository<UsersModel>,
  ) { }

  async createUser(nickname: string, email: string, password: string) {
    const user = this.userRepo.create({
      nickname, email, password,
    });

    const newUser = await this.userRepo.save(user);

    return newUser;
  }
  async getAllUsers() {
    return this.userRepo.find();
  }

}
