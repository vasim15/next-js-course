// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb'
export default async function handler(req, res) {
  if(req.method === "POST"){
    const data = req.body;
    const { title, image, address, description } = data;
    const client = await MongoClient.connect('mongodb+srv://green:VCRKx2vVHDs7HzCn@cluster0.sbm38.mongodb.net/meetup?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({message: 'data inserted'})
  }
  // res.status(200).json({ name: 'John Doe' })
}
