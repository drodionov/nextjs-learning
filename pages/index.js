import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'Meetup 1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Skyscrapers_in_Izmir_-_Turkey.jpg',
    address: 'Izmir, Karsiyaka',
    description: 'The first meetup!'
  },
  {
    id: 'm2',
    title: 'Meetup 2',
    image: 'https://media.istockphoto.com/id/485947800/tr/foto%C4%9Fraf/clock-tower-izmir.jpg?s=612x612&w=0&k=20&c=CqaqzJpDMSkoNrghyCuXYKvtPSiTMPuMVFXGXhFP4oI=',
    address: 'Izmir, Bornova',
    description: 'The first meetup!'
  }
]

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups}/>
}

export const getStaticProps = async () => {
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10
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