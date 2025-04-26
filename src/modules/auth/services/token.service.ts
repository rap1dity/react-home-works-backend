import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { environment } from '@src/environment';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async createTokens(jwtPayload: object): Promise<[string, string]> {
    const {
      tokenKeys: { accessKey, refreshKey, accessTokenExpiresIn, refreshTokenExpiresIn },
    } = environment;

    return Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: accessKey,
        expiresIn: accessTokenExpiresIn,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: refreshKey,
        expiresIn: refreshTokenExpiresIn,
      }),
    ]);
  }
}
