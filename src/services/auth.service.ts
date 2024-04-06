import jwt from 'jsonwebtoken'
import { userModel } from "@models"
import { HttpException } from "@exceptions"
import { hashPassword, validatePassword } from "@utils"
import { 
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_SECRET_KEY
} from "@config"

export class AuthService {
  private users = userModel

  public async userSignUp(payload: any) {
    await this.#_checkUserEmail({ email: payload.email })

    const user = await this.users.create({
      fullname: payload.fullname,
      email: payload.email,
      password: hashPassword(payload.password)
    })

    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user)
    }
  }

  public async userSignIn(payload: { passowrd: string; email: string}) {
    const user = await this.users.findOne({
      email: payload.email
    }).exec()

    if (!user) throw new HttpException(404,' user not found')

    if (await validatePassword(payload.passowrd, user.password)) {
      throw new HttpException(400, 'Password is wrong')
    }

    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user)
    }
  }

  public generateAccessToken(payload: any) {
    return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET_KEY || 'jwt_secret_key', { expiresIn: JWT_ACCESS_TOKEN_EXPIRY })
  }

  public generateRefreshToken(payload: any) {
    return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET_KEY || 'ss', { expiresIn: JWT_REFRESH_TOKEN_EXPIRY })
  }

  async #_checkUserEmail(payload: { email: string }) {
    const user = await this.users.findOne({
      email: payload.email
    }).exec()

    if (user) throw new HttpException(400,'Email already used')
  }
}
