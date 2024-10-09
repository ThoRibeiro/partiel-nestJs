import { Injectable, Inject } from '@nestjs/common';
import { User } from './users.entity';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne<User>({ where: { id } });
  }

  async create(user: IUser): Promise<User> {
    return await this.userRepository.create<User>({...user});
  }

  async update(id: number, user: IUser): Promise<User> {
    const existingUser = await this.userRepository.findByPk<User>(id);
    if (!existingUser) {
      throw new Error('User not found');
    } else {
      await this.userRepository.update(
        { ...user },
        { where: { id: existingUser.id } },
      );
      return await this.userRepository.findByPk<User>(id);
    }
  }

  async remove(id: number): Promise<number> {
    return this.userRepository.destroy({ where: { id } });
  }
}
