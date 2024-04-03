import { userModel } from "@models"



export class TaskService {
  private users = userModel

  public async taskRetrieveAll(payload: any) {
    const userList = await this.users.find().exec()


    return {
      count: 1,
      pageSize: payload.pageSize,
      pageNumber: payload.pageNumber,
      pageCount: 5,
      taslList: userList
    }
  }

  public async taskRetrieveOne() {
    const user = await this.users.findById('').exec()

    return user
  }

  public async taskCreate() {
    const user = await this.users.create({})
  }

  public async taskUpdate(payload: any) {}

  public async taskDelete(payload: { id: string }) {}
}