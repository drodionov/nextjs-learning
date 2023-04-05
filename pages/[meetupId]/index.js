import MeetupDetails from "../../components/meetups/MeetupDetails"
import {MongoClient, ObjectId} from "mongodb"
import {connectToDatabase} from "../../lib/mongodb"
import Head from "next/head";

const MeetupDetailsPage = ({meetupData}) => {
  return <>
    <Head>
      <title>{meetupData.title}</title>
      <meta name={'description'} content={meetupData.description}/>
    </Head>
    <MeetupDetails
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}/>
  </>

}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
      'mongodb://localhost:27017/meetups')
  const db = client.db()

  const meetups = db.collection('meetups')
  const ids = await meetups.distinct('_id')
  await client.close()

  return {
    fallback: true,
    paths: ids.map((id) => ({params: {meetupId: id.toString()}}))
  }

}

export const getStaticProps = async (context) => {
  console.log("Path: " + context.params.meetupId)

  const {client, db} = await connectToDatabase()

  const meetups = db.collection('meetups')
  const meetup = await meetups.findOne(
      {_id: new ObjectId(context.params.meetupId)})
  await client.close()

  return {
    props: {
      meetupData: {
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description
      }
    }

  }

}

export default MeetupDetailsPage