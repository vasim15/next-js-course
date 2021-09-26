import { useRouter } from 'next/router';
import React from 'react'
import Head from 'next/head';

import NewMeetupForm from '../../components/meetups/NewMeetupForm'


const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (data) => {
        const response = await fetch('/api/new-meetup',{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data1 = await response.json();
        console.log(data1);
        router.push('/');
    }
    return (<>
    <Head>
          <title>React Add New Next Meetup</title>
      <meta name="description" content="add new meetup list of meetup by next js"></meta>
      </Head>

    <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>)
}

export default NewMeetupPage
