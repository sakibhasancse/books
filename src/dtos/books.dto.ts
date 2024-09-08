import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidISBN', async: false })
export class IsISBNConstraint implements ValidatorConstraintInterface {
  validate(isbn: string) {
    // Regular expression to check if the ISBN is valid
    const isbnRegex = /^(97(8|9))?\d{9}(\d|X)$/;
    return isbnRegex.test(isbn);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} is not a valid ISBN format!`;
  }
}

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @Validate(IsISBNConstraint, { message: 'Invalid ISBN format! ISBN must be either ISBN-10 or ISBN-13.' })
  isbn: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  @IsString()
  category?: string;
}

export class UpdateBookDto extends CreateBookDto {}
export class UpdateV2BookDto extends CreateBookDto {
  @IsNumber()
  @IsOptional()
  discount?: number;
}
