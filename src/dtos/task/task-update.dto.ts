import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class TaskUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  state?: string

  @IsString()
  @IsNotEmpty()
  userId: string
}
