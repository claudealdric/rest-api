import { IsDateString, IsDefined, IsInt } from 'class-validator';
import { IsIn15MinuteInterval } from 'src/validators/is-in-15-minute-interval.validator';

export class CreateAppointmentDto {
  @IsDefined()
  @IsInt()
  doctorId: number;

  @IsDefined()
  @IsInt()
  patientId: number;

  @IsDefined()
  @IsDateString()
  @IsIn15MinuteInterval()
  dateTime: string;
}
