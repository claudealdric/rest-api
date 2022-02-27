import { registerDecorator } from 'class-validator';

export function IsIn15MinuteInterval(): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isIn15MinuteInterval',
      target: object.constructor,
      options: { message: `${propertyName} must be in 15-minute intervals` },
      validator: {
        validate(input: unknown): boolean {
          return (
            typeof input === 'string' && new Date(input).getMinutes() % 15 === 0
          );
        },
      },
    });
  };
}
