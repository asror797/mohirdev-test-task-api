import { userModel } from '@models'



export class UserService {
  private users = userModel

  public async userRetrieveAll() {}
  public async userRetrieveOne() {}

  public async userCreate(payload: any) {
    await this.#_checkUserEmail({ email: payload.email })

    const user = await this.users.create({
      fullname: payload.fullname,
      email: payload.email,
      password: payload.password
    })

    return user
  }

  public async userUpdate() {}
  public async userDelete() {}

  async #_checkUserEmail(payload: { email: string} ) {
    const user = await this.users.findOne({
      email: payload.email
    }).exec()

    if(user) throw new Error('Error')
  }
}