import MeetupDetails from "../../components/meetups/MeetupDetails"
import {ObjectId} from "mongodb"
import {connectToDatabase} from "../../lib/mongodb"
import Head from "next/head"

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
  const {db} = await connectToDatabase()

  const meetups = db.collection('meetups')
  const ids = await meetups.distinct('_id')

  return {
    fallback: 'blocking',
    paths: ids.map((id) => ({params: {meetupId: id.toString()}}))
  }
}

export const getStaticProps = async (context) => {
  console.log("Path: " + context.params.meetupId)

  const {db} = await connectToDatabase()

  const meetups = db.collection('meetups')
  const meetup = await meetups.findOne(
      {_id: new ObjectId(context.params.meetupId)})
  return {
    props: {
      meetupData: {
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description
      }
    },
    revalidate: 1
  }

}

export default MeetupDetailsPage