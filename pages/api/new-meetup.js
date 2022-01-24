import { MongoClient } from 'mongodb';

// in this File, we will create functions that contains server side ConvolverNode.
// this doesnt return react componenets
// filenames act as path segments in the url

// /api/new-meetup
// if a request is send to the path above, it will trigger a function in this file

async function handler(req, res) {
    // req object contain data the upcoming requests
    // res obj will needed to send back a response
    
    // req.method helps us to find out which kind of request was send (get/post/put/delete)
    // we will only execute this code if it is a post request
    if(req.method === 'POST') {
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://JeanNextjs:Wd4pE7qLDsxZGYeH@cluster0.bdjxc.mongodb.net/meetup?retryWrites=true&w=majority');
        const db = client.db();
        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        console.log(result);

        client.close();
        res.status(201).json({message: 'it worked'});
   }

}



export default handler;
