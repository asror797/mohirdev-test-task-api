import jwt from 'jsonwebtoken'
import { userModel } from '@models'
import { HttpException } from '@exceptions'
import { hashPassword, validatePassword } from '@utils'
import {
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_SECRET_KEY,
} from '@config'

export class AuthService {
  private users = userModel
  private jwtAccessTokenSecret =
    JWT_ACCESS_TOKEN_SECRET_KEY || 'access_secret_key'
  private jwtRefreshTokenSecret =
    JWT_REFRESH_TOKEN_SECRET_KEY || 'refresh_secret_key'
  private jwtAccessTokenExpriy = JWT_ACCESS_TOKEN_EXPIRY || '15m'
  private jwtRefreshTokenExpiry = JWT_REFRESH_TOKEN_EXPIRY || '7d'

  public async userSignUp(payload: any) {
    await this.#_checkUserEmail({ email: payload.email })

    const user = await this.users.create({
      fullname: payload.fullname,
      email: payload.email,
      password: await hashPassword(payload.password),
    })

    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    }
  }

  public async userSignIn(payload: { passowrd: string; email: string }) {
    const user = await this.users
      .findOne({
        email: payload.email,
      })
      .exec()

    if (!user) throw new HttpException(404, ' user not found')

    if (await validatePassword(payload.passowrd, user.password)) {
      throw new HttpException(400, 'Password is wrong')
    }

    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    }
  }

  public async userRefresh(payload: any) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }

  public generateAccessToken(payload: any) {
    return jwt.sign({ ...payload }, this.jwtAccessTokenSecret, {
      expiresIn: this.jwtAccessTokenExpriy,
    })
  }

  public generateRefreshToken(payload: any) {
    return jwt.sign({ ...payload }, this.jwtRefreshTokenSecret, {
      expiresIn: this.jwtRefreshTokenExpiry,
    })
  }

  async #_checkUserEmail(payload: { email: string }) {
    const user = await this.users
      .findOne({
        email: payload.email,
      })
      .exec()

    if (user) throw new HttpException(400, 'Email already used')
  }
}
