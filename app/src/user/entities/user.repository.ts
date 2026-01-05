import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const newUser = this.repo.create(data);
    return await this.repo.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repo.find({ relations: ['role'] });
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return await this.repo.findOne({ where: { id }, relations: ['role'] });
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.repo.findOne({ where: { email }, relations: ['role'] });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity | null> {
    const updateUser = { id, ...data };
    return await this.repo.save(updateUser);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
