import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetails from './../components/meetups/MeetupDetails';

const MeetUpDetails = (props) => {

    return (<>
        <Head>
            <title> {props.meetupData.title}  </title>
            <meta name='description' content={props.meetupData.description}/>
        </Head>

        <MeetupDetails
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    </>)
}

// we dont need this fumction if we are using server side rendering SSR
export async function getStaticPaths() {
    // We need pre-generate all version of this dynamic page for all the IDs in advanace
    // cuz Nextjs needs to know for which ID values should pre-generate the page
    // since this page is pre-generate during the build process


    const client = await MongoClient.connect('mongodb+srv://JeanNextjs:Wd4pE7qLDsxZGYeH@cluster0.bdjxc.mongodb.net/meetup?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    // {_id: 1}means to find only the isDynamicRoute.. no other fields
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();
    

    //getStaticPaths has the job of returning an object where we describe al the dynamic segment values
    // all the ids where this page should be pre-generate
    return {
        //tells nextjs if paths array contains all supported parameter value or some of them
        // false = your path contains all supported meetupId values. We will see a 404 page if user enter a invalid url
        //true = tried to generate a page for upcoming request.
        fallback: 'blocking',

        //we need to add obj to the path array for every id we need to generate a dynamic page
        paths: meetups.map(meetup => ({params: {meetUpId: meetup._id.toString()}}))

    
    }
}


//note: we cant use useRouter to get the ID enconded in the URL.
// cuz useRouter can only be use in the Component function
// If we use context in getStaticProps, context wont hold request and res objects, but
// it will have a params key. There, we can have access to the ID encoded in the URL.
export async function getStaticProps(context) {
    //fetch data for a single meetup
    const meetUpId = context.params.meetUpId;
    
    const client = await MongoClient.connect('mongodb+srv://JeanNextjs:Wd4pE7qLDsxZGYeH@cluster0.bdjxc.mongodb.net/meetup?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetup = await meetupsCollection.findOne({_id: ObjectId(meetUpId)})
    client.close();
    

    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                title: meetup.title, 
                address: meetup.address,
                image: meetup.image,
                description: meetup.description
            }

        }
    }
}

export default MeetUpDetails;