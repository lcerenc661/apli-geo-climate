import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() req: { userId: number; username: string },
  ): Promise<{ access_token: string }> {
    return this.authService.login(req);
  }
}
