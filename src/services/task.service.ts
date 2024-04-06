import { PaginationDto, TaskCreateDto, TaskUpdateDto } from "@dtos"
import { HttpException } from "@exceptions"
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

    const totalCount = await this.tasks.countDocuments(query).exec()

    return {
      count: totalCount,
      pageSize: payload.pageSize,
      pageNumber: payload.pageNumber,
      pageCount: Math.ceil(totalCount / payload.pageSize),
      taskList
    }
  }

  public async taskRetrieveOne(payload: { id: string }) {
    const task = await this.tasks.findById(payload.id).exec()

    if (!task) throw new HttpException(404, 'Task not found')
    return task
  }

  public async taskCreate(payload: TaskCreateDto) {
    const task = await this.tasks.create(payload)

    return task
  }

  public async taskUpdate(payload: TaskUpdateDto) {
    await this.taskRetrieveOne({ id: payload.id })

    const task = await this.tasks.findByIdAndUpdate(payload.id, {
      ... payload
    }, { new: true }).exec()
    return task 

  }

  public async taskDelete(payload: { id: string }) {
    await this.taskRetrieveOne({ id: payload.id })
    const task = await this.tasks.findByIdAndDelete(payload.id).exec()
    
    return task
  }
}
