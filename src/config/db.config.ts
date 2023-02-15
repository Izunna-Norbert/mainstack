import mongoose from 'mongoose';
import { MONGO_URL } from './env.config';

export const db = mongoose.createConnection(MONGO_URL, {
  keepAlive: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 0,
  autoIndex: false,
});

db.asPromise().then((conn) =>
  console.info(`MongoDB connected successfully to ${conn.host}:${conn.port}/${conn.db.databaseName}`),
);

db.on('connected', () => {
  console.info('db connected');
});
