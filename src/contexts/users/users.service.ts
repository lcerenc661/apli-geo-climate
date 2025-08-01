import { Injectable } from '@nestjs/common';
import { simulateAsync } from '../shared/utils/utils';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  async findOne(username: string): Promise<User | undefined> {
    await simulateAsync();
    return this.users.find((user) => user.username === username);
  }
}
