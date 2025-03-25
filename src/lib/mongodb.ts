import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
}

// 開発環境と本番環境で異なるクライアントを生成する関数
const getMongoClient = () => {
  if (process.env.NODE_ENV === 'development') {
    // 開発環境では接続を再利用
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }
    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    return globalWithMongo._mongoClientPromise
  }

  // 本番環境では新しい接続を作成
  const client = new MongoClient(uri, options)
  return client.connect()
}

const clientPromise = getMongoClient()

export default clientPromise
