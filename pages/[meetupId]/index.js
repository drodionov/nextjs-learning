import MeetupDetails from "../../components/meetups/MeetupDetails";
import {MongoClient, ObjectId} from "mongodb";


const MeetupDetailsPage = ({meetupData}) => {
  return <MeetupDetails
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}/>

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

  const client = await MongoClient.connect(
      'mongodb://localhost:27017/meetups')
  const db = client.db()

  const meetups = db.collection('meetups')
  const meetup = await meetups.findOne({_id: new ObjectId(context.params.meetupId)})
  await client.close()
  console.log("Meetup: " + meetup)
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