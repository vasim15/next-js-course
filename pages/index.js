import { MongoClient } from 'mongodb';
import Head from 'next/head'
import React from 'react'
import MeetupList from '../components/meetups/MeetupList'
const DUMMY_MEETUPS = [{
  id: 1,
  title: 'A first Meetup',
  image: 'https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/tahiti1.jpg',
  address: '1 street demo Address place',
  description: 'this is first descripotion'
},
{
  id: 2,
  title: 'A Second Meetup',
  image: 'https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/tahiti1.jpg',
  address: '1 street demo Address place',
  description: 'this is second descripotion'
}
];
const HomePage = (props ) => {
  return (
    <>
    <Head>
      <title>React Next Meetup</title>
      <meta name="description" content="browser list of meetup by next js"></meta>

    </Head>
  <MeetupList meetups={props.meetups} />
  </>)
}


// export async function getServerSideProps(contex){
//   const req = contex.req
//   const res = contex.res
//   //fetch data from api
//   return{
//     props:{
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }



export async function getStaticProps(){
  //fetch data from api
  const client = await MongoClient.connect('mongodb+srv://green:VCRKx2vVHDs7HzCn@cluster0.sbm38.mongodb.net/meetup?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find().toArray();
    client.close();
  
  return{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10
  }
}

export default HomePage
