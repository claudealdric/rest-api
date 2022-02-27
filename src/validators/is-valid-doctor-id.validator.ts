import { registerDecorator } from 'class-validator';
import { Doctor } from 'src/entities/doctor.entity';
import { getConnection } from 'typeorm';

export function IsValidDoctorId(): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isValidDoctorId',
      target: object.constructor,
      options: { message: 'Invalid doctor ID' },
      validator: {
        async validate(input: unknown): Promise<boolean> {
          return Boolean(
            await getConnection().getRepository(Doctor).findOne(input),
          );
        },
      },
    });
  };
}
