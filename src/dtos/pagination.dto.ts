import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator'

export class PaginationDto {
  @IsNumber()
  pageNumber: number

  @IsNumber()
  pageSize: number

  @IsString()
  @IsOptional()
  search?: string

  @IsString()
  @IsOptional()
  userId?: string
}


export class IdDto {
  @IsMongoId()
  readonly id: string
}