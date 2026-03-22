import 'dotenv/config';
import { setServers } from 'node:dns/promises';
import { MongoClient } from 'mongodb';

setServers(['1.1.1.1', '8.8.8.8']);

if (!process.env.NEXT_PUBLIC_DB_URL) {
  throw new Error('MONGODB_URI is not defined in .env');
}

const clientPromise = MongoClient.connect(process.env.NEXT_PUBLIC_DB_URL, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
});

export default clientPromise;
