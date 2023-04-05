import {connectToDatabase} from "../../lib/mongodb"

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405)
  }
  const {client, db} = await connectToDatabase()

  const meetups = db.collection('meetups')
  await meetups.insertOne(req.body)

  await client.close()

  res.status(201).json("Data inserted!")
}

export default handler