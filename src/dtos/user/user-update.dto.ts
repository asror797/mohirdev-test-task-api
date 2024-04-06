import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsOptional()
  fullname?: string

  @IsString()
  @IsOptional()
  email?: string
}
