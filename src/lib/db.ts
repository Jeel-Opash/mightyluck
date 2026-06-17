import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mightyluck';
const DB_NAME     = MONGODB_URI.split('/').pop()?.split('?')[0] || 'mightyluck';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log(`✅ MongoDB connected → ${MONGODB_URI}`);
  return db;
}
