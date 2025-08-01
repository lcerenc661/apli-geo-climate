import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { simulateAsync } from 'src/contexts/shared/utils/utils';
import { UsersService } from 'src/contexts/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: {
    userId: number;
    username: string;
  }): Promise<{ access_token: string }> {
    await simulateAsync();
    const payload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
