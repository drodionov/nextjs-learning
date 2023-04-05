import MeetupList from "../components/meetups/MeetupList"
import {connectToDatabase} from "../lib/mongodb"
import Head from "next/head";

const HomePage = (props) => {
  return <>
    <Head>
      <title>React Meetup</title>
      <meta name={'description'}
            content={'Create your own meetup and share it!'}/>
    </Head>
    <MeetupList meetups={props.meetups}/>
  </>
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