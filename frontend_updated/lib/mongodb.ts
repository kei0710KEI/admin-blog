// lib/mongodb.ts
import mongoose from "mongoose";

const { MONGODB_URI, MONGODB_DB } = process.env;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: MongooseCache | undefined;
}

const globalForMongoose = global as unknown as {
  __mongooseCache?: MongooseCache;
};

export async function connectToDatabase(): Promise<typeof mongoose> {
  // 開発のHMRでもコネクションを再利用
  if (!globalForMongoose.__mongooseCache) {
    globalForMongoose.__mongooseCache = { conn: null, promise: null };
  }

  const cache = globalForMongoose.__mongooseCache;

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI!, {
        dbName: MONGODB_DB || undefined,
        bufferCommands: false,
        maxPoolSize: 10,
      })
      .then((m) => m);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
