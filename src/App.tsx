import React from 'react';
import './App.css';
import { Collection } from 'firestorable';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { observer } from 'mobx-react';

  const firebaseConfig = {
    apiKey: "AIzaSyCrtLO5Vr5Hh_2Pgx7bRN8HSE2oUIPvvlA",

    authDomain: "pi-monitor-72a6a.firebaseapp.com",

    projectId: "pi-monitor-72a6a",

    appId: "1:500921421210:web:27a3db1d0540205a2cfe23",
  };

  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

type Event = {
    gsUrl: string;
    signedUrl: string;
};

const events = new Collection<Event>(
  db,
  "events",
   {
	query: ref => ref
		.where('fileType', '==', 'jpg')
		.orderBy('created', 'desc'),
   }
);

function App() {
	console.log({env: process.env});
  return (
    <div className="App">
	<div className='gallery'>
{
	events.docs.map((doc) => (
		<div className='gallery-item'>
			<img 
				className='gallery-item__img'
				src={doc?.data?.signedUrl}
				alt='foo'
				loading='lazy'
			/>
		</div>
))}
	</div>
    </div>
  );
}

export default observer(App);
