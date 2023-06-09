import {MongoClient} from "mongodb"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

export const connectToDatabase = async () => {
  if (cachedClient && cachedClient.topology && cachedClient.topology.s.state
      === "connected" && cachedDb) {
    return {client: cachedClient, db: cachedDb}
  }

  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    await client.connect()

    const db = client.db(dbName)

    cachedClient = client
    cachedDb = db

    return {client, db}
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw new Error("Failed to connect to MongoDB")
  }
}