import createHttpError from 'http-errors';
// import { addContactSchema } from '../validation/contacts.js';

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createHttpError(400, error.message);
    }
    next();
  };
  return func;
};

export default validateBody;
