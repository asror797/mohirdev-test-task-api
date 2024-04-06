// import { plainToInstance } from 'class-transformer';
// import { validate, ValidationError, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions } from 'class-validator';

// import { HttpException } from 'exceptions/http.exception';

// export const validation = async (
//   type: any,
//   body: any,
//   options?: {
//     skipMissingProperties?: boolean;
//     whitelist?: boolean;
//     forbidNonWhitelisted?: boolean;
//   },
// ): Promise<void> => {
//   const validatorOptions: ValidatorOptions = {
//     skipMissingProperties: options?.skipMissingProperties || false,
//     whitelist: options?.whitelist || false,
//     forbidNonWhitelisted: options?.forbidNonWhitelisted || true,
//   };

//   const errors: ValidationError[] = await validate(plainToInstance(type, body), validatorOptions);

//   if (errors.length > 0) {
//     const message = validationMessageFormatter(errors)

//     throw new HttpException(ErrorCode.ValidationError, errors, message);
//   }
// }
