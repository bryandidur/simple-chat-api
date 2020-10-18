import Joi from '@hapi/joi';
import { Config } from '../interfaces/config.interface';

export class ValidationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export const validateSchema = (schema: Joi.ObjectSchema, config: Config): Config => {
  const {value, error} = schema.validate(config);

  if (error) {
    throw new ValidationError(`Invalid configuration: ${error.message}`);
  }

  return value;
};
