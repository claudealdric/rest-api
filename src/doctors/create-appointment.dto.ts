import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsIn15MinuteInterval } from 'src/validators/is-in-15-minute-interval.validator';
import { IsValidEntityId } from 'src/validators/is-valid-doctor-id.validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: "The doctor's unique integer ID",
    minimum: 1,
    default: 1,
  })
  @IsDefined()
  @IsInt()
  @IsValidEntityId('doctor')
  doctorId: number;

  @ApiProperty({
    description: "The patient's first name",
    default: 'firstName',
  })
  @IsNotEmpty()
  @IsString()
  patientFirstName: string;

  @ApiProperty({
    description: "The patient's last name",
    default: 'lastName',
  })
  @IsNotEmpty()
  @IsString()
  patientLastName: string;

  @ApiProperty({
    description: 'Timestamp in ISO format',
    default: '2022-02-27T16:00:00Z',
  })
  @IsDefined()
  @IsDateString()
  @IsIn15MinuteInterval()
  dateTime: string;

  @ApiProperty({
    description: 'The type of appointment',
    minimum: 1,
    default: 1,
  })
  @IsDefined()
  @IsInt()
  @IsValidEntityId('appointment_kind')
  appointmentKindId: number;
}
