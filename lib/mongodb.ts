import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add MONGODB_URI to your .env.local file");
}

// Cache the client across requests (and hot reloads in dev) to avoid
// opening a new TCP connection on every API call.
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

const client: MongoClient = global._mongoClient ?? new MongoClient(uri);
if (!global._mongoClient) {
  global._mongoClient = client;
}

export async function getDb() {
  await client.connect();
  return client.db("scalex");
}
