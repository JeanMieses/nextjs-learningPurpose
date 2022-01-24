import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from './../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
    const router = useRouter();

    const addMeetupHandler = async (data) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const responseData = await response.json();
        console.log(responseData);
        router.replace('/');
    }

    return (<>
        <Head>
            <title>Add A New Meetup</title>
            <meta
                name='description'
                content='Add your meetup' />

        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>)
}


export default NewMeetupPage;