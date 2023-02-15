import dotenv from 'dotenv';
import appRootPath from 'app-root-path';

dotenv.config({ path: `${appRootPath.path}/.env` });

export function throwIfUndefined<T>(x: T | undefined, name?: string): T {
  if (x === undefined) {
    throw new Error(`${name} must not be undefined`);
  }
  return x;
}

export const MONGO_URL = throwIfUndefined(process.env.MONGO_URL, 'MONGO_URL');

export const PORT = throwIfUndefined(process.env.PORT, 'PORT');
