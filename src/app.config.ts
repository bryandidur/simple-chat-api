import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';
import { validateSchema } from './shared/helpers/config.helper';

const schema: Joi.ObjectSchema = Joi.object({
  port: Joi.number().port().required(),
});

export default registerAs('app', () => {
  return validateSchema(schema, {
    port: process.env.APP_PORT,
  });
});
