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
import { AccessTokenDto, RefreshTokenDto } from '@dtos'

export class AuthService {
  private users = userModel

  public async userSignUp(payload: any) {
    await this.#_checkUserEmail({ email: payload.email })

    const user = await this.users.create({
      fullname: payload.fullname,
      email: payload.email,
      password: await hashPassword(payload.password),
    })

    const accessToken = this.generateAccessToken({ id: user['_id'], role: user.role})
    const refreshToken = this.generateRefreshToken({ id: user['_id'], role: user.role})

    await this.#_saveUserRefresh({ id: user['_id'], refresh: refreshToken })

    return {
      accessToken,
      refreshToken,
    }
  }

  public async userSignIn(payload: { passowrd: string; email: string }) {
    const user = await this.users
      .findOne({
        email: payload.email,
      })
      .exec()

    if (!user) throw new HttpException(404, 'User not found')

    if (await validatePassword(payload.passowrd, user.password)) {
      throw new HttpException(400, 'Password is wrong')
    }

    return {
      accessToken: this.generateAccessToken({ id: user['_id'], role: user.role}),
      refreshToken: this.generateRefreshToken({ id: user['_id'], role: user.role}),
    }
  }

  public async userRefresh(payload: any) {
    const user = await this.users.findOne({
      _id: payload.id,
      refresh: payload.refresh,
    })

    if (!user) throw new HttpException(400, 'Invalid refresh token')

    const accessToken = this.generateAccessToken({ id: user['_id'], role: user.role})

    return {
      accessToken: accessToken,
      refreshToken: payload.refresh,
    }
  }

  public generateAccessToken(payload: AccessTokenDto) {
    return jwt.sign({ id: payload.id, role: payload.role }, JWT_ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
    })
  }

  public generateRefreshToken(payload: RefreshTokenDto) {
    return jwt.sign({ id: payload.id, role: payload.role }, JWT_REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
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

  async #_saveUserRefresh(payload: { id: string; refresh: string }) {
    await this.users.findByIdAndUpdate(payload.id, { refresh: payload.refresh })
  }
}
