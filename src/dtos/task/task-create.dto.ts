import { IsNotEmpty, IsString } from "class-validator"

export class TaskCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  userId: string
}
