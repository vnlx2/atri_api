import {compare} from 'bcrypt';
import {config} from 'dotenv';
import {sign} from 'jsonwebtoken';
import UserRepository from '../repositories/userRepository';
import redisService from './redisService';

config();

export interface IAuthentication {
  iss: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
  aud: string;
}

export default class AuthenticationService {
  private static readonly JWT_EXPIRED = 60 * 60;

  /**
   * Generate JWT
   *
   * @param username string
   * @param role string
   * @returns object
   */
  private static generateJWT(username: string, role: string): object {
    return {
      iss: process.env.APP_HOST,
      sub: username,
      role: role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.JWT_EXPIRED,
      aud: process.env.APP_HOST,
    };
  }

  /**
   * Login
   *
   * @param username string
   * @param password string
   * @returns Promise<string>
   */
  public static async Login(
    username: string,
    password: string
  ): Promise<string> {
    const user = await UserRepository.findByUsername(username, true);
    if (user === null) {
      throw new Error('USER_NOT_FOUND');
    }

    if (!(await compare(password, user.password!))) {
      throw new Error('INVALID_PASSWORD');
    }

    const payload = this.generateJWT(user.username, user.role);
    const token = sign(payload, process.env.TOKEN_KEY!);
    await redisService.set(`token_${user.id}`, token, this.JWT_EXPIRED);

    return token;
  }

  /**
   * Logout
   *
   * @param username string
   * @param token string
   * @returns Promise<void>
   */
  public static async Logout(username: string, token: string): Promise<void> {
    const user = await UserRepository.findByUsername(username, true);
    await redisService.del(`token_${user?.username}`);
    await redisService.set(`blacklist-${token}`, '', this.JWT_EXPIRED);
  }
}
