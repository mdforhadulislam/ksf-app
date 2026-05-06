import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://mdforhadul44_db_user:ZzRp8BTOHm91lfq9@ksf.9ewcyyw.mongodb.net/?appName=ksf';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db('ksf-store');
  return cachedDb;
}
