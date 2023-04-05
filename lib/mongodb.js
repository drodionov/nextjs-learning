import {MongoClient, ServerApiVersion} from "mongodb"

const client = new MongoClient(
    "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD
    + "@cluster0.2ivdjv9.mongodb.net/meetup?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    })

export async function connectToDatabase() {
  if (!client.isConnected) {
    await client.connect()
  }
  const db = client.db("meetups")
  return {client, db};
}