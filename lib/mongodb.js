import {MongoClient} from "mongodb"

const client = new MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export async function connectToDatabase() {
  if (!client.isConnected) {
    await client.connect()
  }
  const db = client.db("meetups")
  return {client, db};
}