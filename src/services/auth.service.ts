import { userModel } from "@models"
import { HttpException } from "exceptions/http.exception"
import { hashPassword } from "utils/password.util"

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

    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    }
  }

  public generateAccessToken(payload: any) {}
  public generateRefreshToken(payload: any) {}

  async #_checkUserEmail(payload: { email: string }) {
    const user = await this.users.findOne({
      email: payload.email
    }).exec()

    if (user) throw new HttpException(400,'Email already used')
  }
}
