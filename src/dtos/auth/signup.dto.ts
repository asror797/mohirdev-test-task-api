import { IsNotEmpty, IsString } from 'class-validator'

export class AuthSignUpDto {
  @IsString()
  @IsNotEmpty()
  fullname: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
