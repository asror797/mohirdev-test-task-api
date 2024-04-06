export interface TaskList {
  _id: string
  title: string
  description: string
  state: string
}

export interface TaskRetrieveAllResponse {
  count: number
  pageSize: number
  pageNumber: number
  pageCount: number
  taskList: TaskList[]
}
