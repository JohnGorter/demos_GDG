const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.end("hello");
});

exports.simpleDbFunction = functions.database.ref('/chats')
    .onCreate((snap, context) => {
       
      if (context.authType === 'ADMIN') {
        console.log(snap.val(), 'written by ADMIN');
      } else if (context.authType === 'USER') {
        console.log(snap.val(), 'written by', context.auth.uid);
      }
    });

exports.makeUppercase = functions.database.ref('/chats/{key}').onCreate((event, context) => {
const original = event.val()
console.log('Uppercasing', context.params.key, original)
const uppercase = original.toUpperCase()
return event.ref.parent.child('uppercase').set(uppercase)
})