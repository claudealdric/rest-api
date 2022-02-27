import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsInt } from 'class-validator';
import { IsIn15MinuteInterval } from 'src/validators/is-in-15-minute-interval.validator';
import { IsValidDoctorId } from 'src/validators/is-valid-doctor-id.validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: "The doctor's unique integer ID",
    minimum: 1,
    default: 1,
  })
  @IsDefined()
  @IsInt()
  @IsValidDoctorId()
  doctorId: number;

  @ApiProperty({
    description: "The patient's unique integer ID",
    minimum: 1,
    default: 1,
  })
  @IsDefined()
  @IsInt()
  patientId: number;

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
  appointmentKindId: number;
}
