import {MongoClient} from "mongodb"

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405)
  }
  const client = await MongoClient.connect(
      'mongodb://localhost:27017/meetups')
  const db = client.db()

  const meetups = db.collection('meetups')
  const result = await meetups.insertOne(req.body)

  console.log(result)
  await client.close()

  res.status(201).json("Data inserted!")
}

export default handler