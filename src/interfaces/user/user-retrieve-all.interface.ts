export interface UserList {
  _id: string
  fullname: string
  email: string
  createdAt: Date
}

export interface UserRetrieveAllResponse {
  count: number
  pageSize: number
  pageNumber: number
  pageCount: number
  userList: UserList[]
}
