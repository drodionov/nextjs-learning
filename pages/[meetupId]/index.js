import MeetupDetails from "../../components/meetups/MeetupDetails";

const MeetupDetailsPage = ({meetupData}) => {
  return <MeetupDetails
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}/>

}

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      }
    ]
  }

}

export const getStaticProps = async (context) => {
  console.log("Path: " + context.params.meetupId)

  return {
    props: {
      meetupData: {
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Skyscrapers_in_Izmir_-_Turkey.jpg',
        title: 'Dummy Meetup',
        address: 'Some Address, Building 5, 36500',
        description: 'Some long long long long long long long long long long long long long description about this wonderful meetup'
      }
    }

  }

}

export default MeetupDetailsPage