import React from 'react'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {

    return (
        <>
        <Head>
          <title>{props.meetupData.title}</title>
          <meta name="description" content={props.meetupData.description}></meta>
      </Head>
        <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
          />
          </>
        );
}

export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://green:VCRKx2vVHDs7HzCn@cluster0.sbm38.mongodb.net/meetup?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({},{ _id: 1 }).toArray();
    client.close();

    return{
        fallback: false,
        paths: meetups.map(meetup=>({params:{meetupId: meetup._id.toString() }}))
        // [
        //     {
        //         params: {
        //             meetupId: '1',
        //         },
        //     },
        //     {
        //         params: {
        //             meetupId: '2',
        //         },
        //     }
        // ]
    }
}

export async function getStaticProps(context){
    const meetId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://green:VCRKx2vVHDs7HzCn@cluster0.sbm38.mongodb.net/meetup?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const selected = await meetupCollection.findOne({ _id: ObjectId(meetId) });
    client.close();
    // console.log(selected);
    return{
        props: {
            meetupData: {
                id: selected._id.toString(),
                title: selected.title,
                address: selected.address,
                image: selected.image,
                description: selected.description,
            }
        }
    }
}

export default MeetupDetails
