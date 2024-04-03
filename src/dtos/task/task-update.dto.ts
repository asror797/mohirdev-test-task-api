import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class TaskCreateDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  state: string

  @IsString()
  @IsNotEmpty()
  user: string
}
