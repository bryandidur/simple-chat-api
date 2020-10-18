import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';
import { validateSchema } from '../../helpers/config.helper';

const schema: Joi.ObjectSchema = Joi.object({
  uri: Joi.string().uri().required(),
});

export default registerAs('database', () => {
  return validateSchema(schema, {
    uri: process.env.DB_URI,
  });
});
