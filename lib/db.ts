import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB ?? "siema";

let client: MongoClient;
let db: Db;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

export async function getDb(): Promise<Db> {
  if (db) return db;
  if (global._mongoClient) {
    client = global._mongoClient;
  } else {
    client = new MongoClient(uri);
    await client.connect();
    global._mongoClient = client;
  }
  db = client.db(dbName);
  return db;
}
