import MeetupList from "../components/meetups/MeetupList"
import {connectToDatabase} from "../lib/mongodb"

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups}/>
}

export const getStaticProps = async () => {
  const {client, db} = await connectToDatabase()

  const meetups = db.collection('meetups')
  const meetupsData = await meetups.find().toArray()
  meetupsData.forEach(meetup => {
    meetup.id = meetup._id.toString()
  })

  await client.close()
  return {
    props: {
      meetups: meetupsData.map((data) => ({
        id: data._id.toString(),
        image: data.image,
        description: data.description,
        title: data.title
      }))
    },
    revalidate: 1
  }
}

// export const getServerSideProps = async (context) => {
//   const response = context.res
//   const request = context.req
//
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage