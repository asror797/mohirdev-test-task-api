import { PaginationDto } from '@dtos'
import { UserRetrieveAllResponse } from '@interfaces'
import { userModel } from '@models'
import { UserUpdateDto } from 'dtos/user'

export class UserService {
  private users = userModel
  
  public async userRetrieveAll(payload: PaginationDto): Promise<UserRetrieveAllResponse> {
    const query: any = {}

    if (payload.search) {
      query.fullname = { $regex: payload.search.trim(), $options: 'i' }
      query.email = { $regex: payload.search.trim(), $options: 'i' }
    }

    const userList = await this.users
      .find(query)
      .skip((payload.pageNumber - 1) * payload.pageSize)
      .limit(payload.pageSize)
      .sort({ createdAt: -1 })
      .select('fullname email createdAt')
      .exec()

    const totalCount = await this.users.countDocuments(query).exec()

    return {
      count: totalCount,
      pageSize: payload.pageSize,
      pageNumber: payload.pageNumber,
      pageCount: Math.ceil(totalCount / payload.pageSize),
      userList,
    }
  }

  public async userRetrieveOne(payload: { id: string }) {
    const user = await this.users.findById(payload.id).exec()

    return user
  }

  public async userCreate(payload: any) {
    await this.#_checkUserEmail({ email: payload.email })

    const user = await this.users.create({
      fullname: payload.fullname,
      email: payload.email,
      password: payload.password,
    })

    return user
  }

  public async userUpdate(payload: UserUpdateDto) {
    await this.userRetrieveOne({ id: payload.id })
    const user = await this.users
      .findByIdAndUpdate(payload.id, { ...payload })
      .exec()

    return user
  }

  public async userDelete(payload: { id: string }) {
    await this.userRetrieveOne({ id: payload.id })

    const user = await this.users.findByIdAndDelete(payload.id).exec()

    return user
  }

  async #_checkUserEmail(payload: { email: string }) {
    const user = await this.users
      .findOne({
        email: payload.email,
      })
      .exec()

    if (user) throw new Error('Error')
  }
}
