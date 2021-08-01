const admin = require("firebase-admin");

const args = process.argv.slice(2);

const serviceAccount = require('/home/pi/services/pi-monitor/firebase-sdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const collection = firestore.collection('events');
const gsUrl = args[0];
const signedUrl = args[1];
const fileType = gsUrl.split('.').pop();
const fileName = gsUrl.split('/').pop();
const videoGsUrl = gsUrl.replace('.jpg', '.mkv');
collection.doc(fileName).set({
		gsUrl,
		signedUrl,
		fileType,
		created: admin.firestore.FieldValue.serverTimestamp(),
		videoGsUrl,
	});

