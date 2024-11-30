import dotenv from 'dotenv';

dotenv.config();

// console.log('Loaded ENV Variables:', process.env);

export function env(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
