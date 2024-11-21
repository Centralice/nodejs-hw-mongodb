import UserCollection from '../db/models/User.js';
import createHttpError from 'http-errors';

export const register = async (payload) => {
  const { email } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  return UserCollection.create(payload);
};
