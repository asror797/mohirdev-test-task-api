import { PaginationDto, TaskCreateDto } from "@dtos"
import { taskModel } from "@models"

export class TaskService {
  private tasks = taskModel

  public async taskRetrieveAll(payload: PaginationDto) {
    const query: any = {}

    if (payload.search) {
      query.title = { $regex: payload.search.trim(), $options: 'i' }
    }

    if (payload.userId) {
      query.user = payload.userId
    }

    const taskList = await this.tasks
      .find(query)
      .skip((payload.pageNumber - 1) * payload.pageSize)
      .limit(payload.pageSize)
      .sort({ createdAt: -1 })
      .select('title description state createdAt updatedAt')
      .exec()

    const count = await this.tasks.countDocuments(query).exec()

    return {
      count: count,
      pageSize: payload.pageSize,
      pageNumber: payload.pageNumber,
      pageCount: 5,
      taskList: taskList
    }
  }

  public async taskRetrieveOne(payload: { id: string }) {
    const user = await this.tasks.findById(payload.id).exec()

    return user
  }

  public async taskCreate(payload: TaskCreateDto) {
    const user = await this.tasks.create(payload)

    return user
  }

  public async taskUpdate(payload: any) {}

  public async taskDelete(payload: { id: string }) {}
}