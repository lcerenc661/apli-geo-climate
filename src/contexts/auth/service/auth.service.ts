import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/contexts/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ userId: number; username: string } | null> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const result = { ...user };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...safeUser } = user;
      return result as { userId: number; username: string };
    }

    return null;
  }
}
