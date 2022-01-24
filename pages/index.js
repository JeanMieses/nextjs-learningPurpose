import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from './../components/meetups/MeetupList';

// const meetups = [
//     {
//         id: 'm1', 
//         title: 'Punta Cana Beach', 
//         image: 'https://www.azamara.com/sites/default/files/heros/1800x1000-punta-cana.jpg',
//         address: 'Punta Cana, Dominican Republic'
//     }, 

//     {
//         id: 'm2', 
//         title: 'Cancun Hotel', 
//         image: 'https://www.rutasyrutinas.com/wp-content/uploads/2019/10/hotel-cancun-fiesta-americana11.jpg',
//         address: 'Cancun, Mexico'
//     }]


const HomePage = (props) => {
    

    
    // there is a problem when when use useState and useEffect to make a request
    // the problem that the data that we fetch by using side effects, wont show in the page source
    // because when we render this Component, initiallly, loadedMeetups willl be an empty Array,
    // and then it will be updtes by side effect in the second rendering.
    // Causing the app to miss data in the first rendering and affecting engine optimization.
    // to solve this problem, we use, static generation and server side rendering

    // Static generation: page is rendering when you build your application (NPM RUN BUILD)
    // by default, the page is not pre-rendered on the fly on the server when a request reach the server
    // instead, it is pre-rendered when you as developer build your site for production
    // After it was deploy, that page does not change. If you update the data, then you need to
    // do the build process again and redeploy again.


    return (<>
        <Head>
           <title>React Meetups</title> 
            <meta name='description' content='Browser a huge list of highly active of React Meetups'/>
        </Head>
        <MeetupList meetups={props.meetups}/>
        </>
    )
}

// Static generation// this only works in the page component file.
// the job of this function is to prepare props for this Component
// and we can use it to make HTTP request, and pass the data as props to the component
// this code will never run in the client-side
export async function getStaticProps() {
    //fecth data from api/db... w
    // we could use the fecth function to make a request, but that will be redudant
    // that is why we are setting our api request here
    
    const client = await MongoClient.connect('mongodb+srv://JeanNextjs:Wd4pE7qLDsxZGYeH@cluster0.bdjxc.mongodb.net/meetup?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();
    client.close();


    return {
        props: {
            meetups: meetups.map(meetup => ({
                // title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
              }))
        },

        revalidate: 10
    }
}

export default HomePage;