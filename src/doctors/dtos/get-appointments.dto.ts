import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class GetAppointmentsDto {
  @IsNotEmpty()
  @IsNumberString()
  doctorId: string;

  @IsNotEmpty()
  @IsDateString()
  dateTime: string;

  @IsOptional()
  @IsNumberString()
  skip: string;

  @IsOptional()
  @IsNumberString()
  take: string;
}
