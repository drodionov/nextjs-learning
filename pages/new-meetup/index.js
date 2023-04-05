import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter()
  const onAddMeetupHandler = async (meetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-type': 'application/json'
      }
    })

    const data = await response.json()

    console.log(data)
    await router.push('/')
  }

  return <>
    <Head>
      <title>Create you own meetup!</title>
      <meta name={'description'} content={'Create a New Meetup'}/>
    </Head>
    <NewMeetupForm onAddMeetup={onAddMeetupHandler}/>
  </>
}

export default NewMeetupPage