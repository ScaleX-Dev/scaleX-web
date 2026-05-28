import { MongoClient } from "mongodb";

// Cache the client across requests (and hot reloads in dev) to avoid
// opening a new TCP connection on every API call.
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

function getMongoClient() {
  if (global._mongoClient) {
    return global._mongoClient;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please add MONGODB_URI to your .env.local file");
  }

  global._mongoClient = new MongoClient(uri);
  return global._mongoClient;
}

export async function getDb() {
  const client = getMongoClient();
  await client.connect();
  return client.db("scalex");
}
