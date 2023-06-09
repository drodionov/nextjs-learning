import {connectToDatabase} from "../../lib/mongodb"

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405)
  }
  const {db} = await connectToDatabase()

  const meetups = db.collection('meetups')
  await meetups.insertOne(req.body)

  res.status(201).json("Data inserted!")
}

export default handler