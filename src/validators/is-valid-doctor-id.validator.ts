import { registerDecorator } from 'class-validator';
import { getConnection } from 'typeorm';

export function IsValidEntityId(entityName: string): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isValidEntityId',
      target: object.constructor,
      options: { message: `Invalid ID for entity: ${entityName}` },
      validator: {
        async validate(input: unknown): Promise<boolean> {
          return Boolean(
            await getConnection().getRepository(entityName).findOne(input),
          );
        },
      },
    });
  };
}
